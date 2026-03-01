---
title: Spring Data JPA에서 새로운 Entity를 판단하는 방법
aliases:
cover_image: ""
description:
permalink:
classification: blog
tags:
  - java
  - JPA
draft: false
published: 2026-02-08T21:40:00
lang: ko
created: 2026-02-08T21:18
updated: 2026-02-08T21:50
---

- Spring Data JPA의 save 메서드는 엔티티의 신규 여부(`isNew`)에 따라 persist 또는 merge를 선택적으로 실행한다.
- 이 내부 동작을 정확히 이해하지 못하면 직접 ID를 할당하는 환경에서 merge가 호출되어 불필요한 SELECT 쿼리가 발생하는 성능 저하를 겪을 수 있다.
- `save()` 메서드의 내부 코드를 보면 `entityInformation.isNew(entity)` 호출 결과에 따라 분기 처리 된다.

```java
@Override
@Transactional
public <S extends T> S save(S entity) {
    Assert.notNull(entity, "Entity must not be null");

    if (entityInformation.isNew(entity)) {
        entityManager.persist(entity); // 신규 저장
        return entity;
    } else {
        return entityManager.merge(entity); // 수정(병합)
    }
}
```

### @Version 필드가 존재하는 경우

- `@Version` 필드가 있고, 타입이 객체(Wrapper class)라면 해당 필드가 `null`일 때만 새로운 엔티티로 판단한다.
	- primitive 타입인 경우 `AbstractEntityInformation`의 로직을 따른다.

```java
@Override
public boolean isNew(T entity) {
    if(versionAttribute.isEmpty()
          || versionAttribute.map(Attribute::getJavaType).map(Class::isPrimitive).orElse(false)) {
        return super.isNew(entity);
    }

    BeanWrapper wrapper = new DirectFieldAccessFallbackBeanWrapper(entity);
    // Version 값이 null이면 신규 엔티티
    return versionAttribute.map(it -> wrapper.getPropertyValue(it.getName()) == null).orElse(true);
}
```

### @Version 필드가 존재하지 않는 경우

- `@Id` 필드를 기준으로 판단한다.
	- 식별자가 객체 타입이면 `null` 여부, 숫자 타입(`Number`)이면 0 여부를 확인한다.

```java
public boolean isNew(T entity) {
    Id id = getId(entity);
    Class<ID> idType = getIdType();

    if (!idType.isPrimitive()) {
        return id == null; // 객체 타입 ID가 null이면 신규
    }

    if (id instanceof Number) {
        return ((Number) id).longValue() == 0L; // 숫자 타입 ID가 0이면 신규
    }

    throw new IllegalArgumentException(String.format("Unsupported primitive id type %s", idType));
}
```

### 직접 ID를 할당한다면?

- 키 생성 전략을 사용하지 않고 직접 ID를 할당하는 경우 새로운 entity로 간주되지 않는다.
- `@GeneratedValue`를 사용하면 DB 저장 시점에 ID가 생성되므로 `save()` 호출 시 ID는 `null`이다.
	- `isNew()`가 `true`
- Application에서 ID를 직접 할당(`@Id`만 사용)하는 경우, `save()`를 호출하기 전에 이미 ID 값이 존재하게 된다.
	- 이로 인해 JPA는 이를 기존 데이터로 오해하여 `merge()`를 호출하고, DB에 데이터가 있는지 확인하는 불필요한 SELECT 쿼리를 날리게 된다.

### Persistable 인터페이스 구현

- 위와 같은 문제를 해결하기 위해 Persistable 인터페이스 구현을 고려해 볼 수 있다.
- 직접 ID 할당 방식을 사용할 때는 엔티티에 `Persistable` 인터페이스를 구현하여 판단 로직을 직접 정의해야 한다.
	- `JpaPersistableEntityInformation`이 동작
- 아래 코드와 같이 `save()` 호출 시 `isNew()`가 `createdDate`의 유무에 따라 결정되므로, ID가 채워져 있어도 안전하게 `persist()`를 호출할 수 있다.

```java
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Item implements Persistable<String> {

    @Id
    private String id;

    @CreatedDate
    private LocalDateTime createdDate; // 생성일자를 활용한 신규 여부 판단

    public Item(String id) {
        this.id = id;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public boolean isNew() {
        // 생성일자가 null이면 새로운 엔티티로 판단
        return createdDate == null;
    }
}
```

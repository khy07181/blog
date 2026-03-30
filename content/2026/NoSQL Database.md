---
title: NoSQL Database
aliases:
  - NoSQL
cover_image: ""
description:
permalink:
classification:
category:
  - dev
tags:
  - db
  - NoSQL
draft: false
published: 2026-03-01T22:40:00
lang: ko
created: 2026-03-01T21:46
updated: 2026-03-29T16:25
---

## NoSQL Database

- NoSQL(Not Only SQL)은 일반적으로 모든 비관계형 데이터베이스를 지칭할 때 사용되며 관계형 데이터 베이스의 테이블과는 다른 방식으로 다양한 유형의 데이터를 저장한다.
- 대표적으로 다음과 같은 환경에서 많이 사용된다.
	- 대규모 트래픽 처리
	- 분산 시스템
	- 비정형 데이터 저장
	- 빠른 읽기/쓰기 성능 요구
- ACID 원칙을 추구하는 RDB와 달리 NoSQL 데이터베이스는 BASE 원칙을 따른다.
	- **B**asic **A**vailability
		- 시스템이 부분적인 장애가 발생하더라도 전체 시스템이 중단되지 않는다.
	- **S**oft state
		- 데이터가 일정 시간 동안 일관되지 않을 수 있다.
	- **E**ventual consistency
		- 데이터는 궁극적으로 일관된 상태를 가진다.

## NoSQL Database의 종류

Key-Value, Document, Wide-Column, Graph 4가지 유형으로 나뉜다.

### Key-Value

- 고유한 Key-Value 쌍으로 구성되는 데이터 모델을 사용한다.
- Caching과 세션 관리에 사용되며 구조가 단순하고 주로 메모리에 데이터를 저장하기 때문에 읽기 및 쓰기 성능이 우수하다.
- 주요 사용 사례
	- Caching
	- 사용자 세션 관리
- 종류
	- Redis
	- Memcached
	- Amazon DynamoDB

### Document

- JSON, XML, BSON 등의 문서 형식으로 데이터를 저장한다.
- 유연한 데이터 모델을 제공하여 반정형 데이터나 비정형 데이터 집합에 적합하다.
- 문서 내부 구조를 자유롭게 정의할 수 있기 때문에 스키마가 자주 변경되는 서비스에 적합하다.
- 주요 용도
	- CMS(Content Management System)
	- 로그 데이터
	- 사용자 프로필 관리
- 종류
	- MongoDB
	- Couchbase

### Wider-Column

- 기존 SQL 데이터베이스와 달리 고정된 스키마 없이 컬럼 단위로 데이터를 유연하게 저장한다.
- 대량의 데이터를 수평적으로 확장(Scale-out)하기 용이하며 뛰어난 쓰기 성능을 제공한다.
- 주요 용도
	- 시계열 데이터
	- 로그 데이터
	- 실시간 빅데이터 분석
- 종류
	- Apache Cassandra
	- HBase

### Graph

- 노드와 엣지 형태로 데이터를 저장한다.
- 노드는 일반적으로 사람, 장소, 사물처럼 명사에 해당하는 개체 정보를 저장하고, 엣지는 노드들 사이의 관계 정보를 저장한다.
- 주요 용도
	- SNS 친구 추천
	- Fraud Detection(사기 탐지)
	- 추천 엔진
	- 경로 탐색
- 종류
	- Neo4J
	- Amazon Neptune

## NoSQL vs RDB

- 서비스의 특성에 따라 적절한 데이터베이스 유형을 선택해야 한다.
	- 금융이나 재고처럼 일관성이 중요한 서비스라면 RDB SQL을 사용하는 것이 적잘하다.
	- 초당 수만~수십만 건의 요청이나 전 세계 사용자들이 동시에 접속하는 게임이나 스트리밍 서비스라면 NoSQL을 사용하는 것이 적절하다.
- 규모가 있는 서비스에서는 RDB와 NoSQL 각자의 강점이 다르기 때문에 적절히 혼합하여 데이터의 특성에 맞게 하이브리드 구조 또는 Polyglot Persistence 전략을 채택한다.

|         | RDB                          | NoSQL                                 |
| ------- | ---------------------------- | ------------------------------------- |
| 데이터 구조  | 테이블(행과 열)을 사용하여 구조화된 데이터에 적합 | 다양한 데이터 모델을 사용하여 비정형 및 반정형 데이터 처리에 적합 |
| 확장성     | Scale-up(수직적 확장)             | Scale-out(수평적 확장, 샤딩)                 |
| 원칙      | ACID                         | BASE(일부 ACID 원칙 준수 가능)                |
| 데이터 관계  | 관계는 외래키를 통해 정의되고 JOIN을 통해 접근 | 관계는 중첩 구조이거나 명시적 또는 암묵적일 수 있음         |
| 성능      | 읽기 위주의 작업과 트랜잭션 중심 워크로드에 적합  | 실시간 처리, 빅데이터 분석 및 분산 환경에 적합           |
| 데이터 일관성 | 높은 데이터 일관성                   | 궁극적 일관성                               |
| 데이터 분할  | 테이블 기반 분할 또는 파티션 프루닝 지원      | 샤딩과 복제를 통해 데이터 분할                     |

## Related Posts

- [[CAP]]

## Links

- [MongoDB- NoSQL이란?](https://www.mongodb.com/ko-kr/resources/basics/databases/nosql-explained)
- [SQL vs NoSQL, 우리 서비스엔 뭐가 정답일까?](https://yozm.wishket.com/magazine/detail/3169/)

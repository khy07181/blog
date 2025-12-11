---
title: PostgreSQL Function
aliases:
classification: blog
tags:
  - postgresql
  - sql
  - db
description:
permalink:
draft: false
published: 2025-11-30
created: 2025-11-30T21:21:00
updated: 2025-12-11T22:38
---

PostgreSQL 을 꽤 오래 써왔지만 함수를 만들어서 사용해 본적은 처음인 것 같다.

PostgreSQL 에서 함수를 생성하여 사용하는 방법

```sql
CREATE [OR REPLACE] FUNCTION function_name ([parameter1 data_type [, parameter2 data_type, ...]]) 
[RETURNS return_type] 
[LANGUAGE language_name] 
AS $$ -- Function body goes here $$;
```

CREATE 대신 CREATE OR REPLACE를 사용하면 이미 같은 이름의 함수가 있을 경우 대체된다.
>[!warning]
>CREATE OR REPLACE 사용 시 기존 함수가 있다면 덮어씌워지기 때문에 주의해서 사용해야 한다.

숫자 2개를 받아 합을 반환하는 간단한 함수

```sql
CREATE FUNCTION add(a integer, b integer) RETURNS integer
    LANGUAGE SQL
    IMMUTABLE
    RETURNS NULL ON NULL INPUT
    RETURN a + b;
```

 ```sql
 CREATE OR REPLACE FUNCTION calculate_sum(a integer, b integer)  
	RETURNS integer  
AS  
$$  
BEGIN  
	RETURN a + b;  
END;  
$$ LANGUAGE plpgsql;
```   

간단한 함수는 대부분 이미 기본적으로 지원하지만 다음과 같이 원하는 기능을 가지는 함수를 만들 수도 있다.

문자열을 받아 제외시키고 싶은 문자열들을 제외시키는 함수

```sql
CREATE FUNCTION exclude_words(name text, excluded_words text[])  
RETURNS text  
AS $$  
DECLARE  
result text;  
word_to_exclude text;  
BEGIN  
result := name;  
  
FOREACH word_to_exclude IN ARRAY excluded_words  
LOOP  
result := regexp_replace(result, word_to_exclude, '', 'gi');  
END LOOP;  
  
RETURN result;  
END;  
$$ LANGUAGE plpgsql;
```

### Links

[PostgreSQL - CREATE FUNCTION](https://www.postgresql.org/docs/current/sql-createfunction.html)

---
title: RealMySQL 실행계획
aliases:
  - RealMySQL 10장
cover_image: ""
description:
permalink:
classification:
tags:
  - db
  - MySQL
  - RealMySQL
draft: false
published: 2026-01-25T22:19:00
lang: ko
created: 2026-01-24T22:52
updated: 2026-01-25T22:19
---

## 통계 정보

MySQL 서버의 통계 정보
- MySQL 5.6부터는 InnoDB 스토리지 엔진을 사용하는 테이블에 대한 통계 정보를 영구적으로 관리할 수 있게 개선되었다.
	- 이전에는 메모리에만 저장되어 MySQL 서버가 재시작되면 통계 정보가 초기화됐다.

### 히스토그램

히스토그램의 정보 수집 및 삭제
- Singleton Histogram
	- 컬럼값 개별로 레코드 건수를 관리하는 히스토그램
- Equi-Height Histogram
	- 컬럼값의 범위를 균등한 개수로 구분해서 관리하는 히스토그램

히스토그램의 용도
- 히스토그램 정보가 없으면 옵티마이저는 데이터가 균등하게 분포돼 있을 것으로 예측한다. 하지만 히스토그램이 있으면 특정 범위의 데이터가 많고 적음을 식별할 수 있다.

히스토그램과 인덱스
- 인덱스 다이브 (Index Dive)
	- 옵티마이저는 실행 계획 수립 시 실제 인덱스 B-Tree를 샘플링하여 조건절에 일치하는 레코드 건수를 예측한다.
- 인덱스와 히스토그램의 관계
	- MySQL 8.0에서는 인덱스가 있는 컬럼은 히스토그램보다 실제 인덱스 다이브를 통해 수집한 정보를 우선하여 사용한다.
	- 히스토그램은 주로 인덱스가 없는 컬럼의 데이터 분포를 참조하는 용도로 사용된다.

코스트 모델(Cost Model)
- 코스트 모델의 역할
	- 전체 쿼리 비용을 계산하는 단위 작업들의 비용을 관리한다.
	- MySQL 5.7부터 mysql의 `server_cost`와 `engine_cost` 테이블을 통해 관리자가 비용 상수를 조정할 수 있게 되었다.
- 주요 비용 상수
	- `io_block_read_cost`
		- 디스크 데이터 페이지 읽기 비용.
	- `row_evaluate_cost`
		- 레코드 비교 비용.
		- 이 값이 증가하면 풀 스캔 비용이 높아져 인덱스 레인지 스캔 가능성이 높아진다,.

## 실행 계획 확인

### 실행 계획 출력 포맷

- FORMAT 옵션을 통해 실행 계획의 표시 방법을 JSON이나 TREE, 단순 테이블 형태로 선택할 수 있다.
	- `EXPLAIN FORMAT=TREE`

### 쿼리의 실행 시간 확인

- EXPLAIN ANALYZE
	- 실제 쿼리를 실행하고 단계별 소요 시간, 처리한 레코드 건수, 반복 횟수(loops)를 TREE 포맷으로 보여준다,.

## 실행 계획 분석

### id 칼럼

단위(SELECT) 쿼리 식별자
- `SELECT` 키워드 단위로 부여되는 식별자 값이다.
- 조인 시에는 id가 증가하지 않고 같지만, 서브쿼리나 UNION 사용 시 id가 증가한다,.

### select_type 칼럼

각 단위 SELECT 쿼리가 어떤 타입의 쿼리인지 표시되는 컬럼
- SIMPLE
	- UNION이나 서브쿼리가 없는 단순 SELECT
- PRIMARY
	- UNION이나 서브쿼리를 가진 쿼리의 가장 바깥쪽(Outer) 단위 쿼리
- UNION
	- UNION으로 결합하는 단위 SELECT 쿼리 중 첫 번째를 제외한 두 번째 이후 단위 SELECT 쿼리
- DEPENDENT UNION
	- UNION이나 UNION ALL로 집합을 결합하는 쿼리
	- DEPENDENT는 UNION이나 UNION ALL로 결합된 단위 쿼리가 외부 쿼리에 의해 영향을 받는 것을 의미
- UNION RESULT
	- UNION 결과를 담아두는 테이블을 의미
- SUBQUERY
	- FROM 절 이외에서 사용되는 서브쿼리만을 의미
- DEPENDENT SUBQUERY
	- 서브쿼리가 Outer SELECT 쿼리에서 정의된 컬럼을 사용하는 경우 표시
- DERIVED
	- 단위 SELECT 쿼리의 실행 결과로 메모리나 디스크에 임시 테이블을 생성하는 것을 의미
- DEPENDENT DERIVED
	- 해당 테이블이 LATERAL JOIN이 사용된 것을 의미
- UNCACHEABLE SUBQUERY
	- 서브쿼리 결과 캐시가 불가능할 때 표시
- MATERIALIZED
	- FROM 절이나 IN(Subquery) 형태의 쿼리에 용된 서브쿼리의 최적화를 위해 사용

### table 컬럼

실행 대상 테이블
- 실행 계획은 테이블 기준으로 표시된다.
- `<derived N>`은 id N번 쿼리의 파생 테이블을 의미한다.

### partitions 컬럼

- 파티션 테이블에 대한 실행 계획 정보 제공
Partition Pruning
- 파티션 테이블에서 쿼리 처리에 필요한 파티션만 골라내는 과정이며, 접근한 파티션 목록이 이 칼럼에 표시된다.

### type 컬럼 (접근 방법)

성능이 빠른 순서
- system
	- 레코드가 0~1건인 테이블을 참조하는 형태의 접근 방법
	- MyISAM, Memory 테이블에서만 사용
- const
	- PK나 유니크 키로 1건만 조회 (매우 빠름).
- eq_ref
	- 여러 테이블 조인 시 테이블의 PK나 유니크 키로 검색 조건에 사용할 때 사용됨
- ref
	- 인덱스 종류와 관계없이 동등(Equal) 조건 검색
	- eq_ref와 달리 조인의 순서와 관겡벗고, PK나 유니크 키 등의 제약조건도 없다.
- fulltext
	- 전문 검색(Full-text Search) 인덱스를 사용해 레코드를 읽는 접근 방법
- ref_or_null
	- ref 방식 또는 NULL 비교 접근 방법
- unique_subquery
	- WHERE 조건절에서 사용될 수 있는 IN 형태의 쿼리를 위한 접근 방법
- index_subquery
	- 서브쿼리 결과의 중복된 값을 인덱스를 이용해서 제거할 수 있을 때 사용
- range
	- 인덱스 레인지 스캔 (`<`, `>`, `BETWEEN`, `IN`, `LIKE` 등)
- index_merge
	- 2개 이상의 인덱스를 이용해 검색 결과를 병합해서 처리하는 방식
- index
	- 인덱스 풀 스캔
	- 커버링 인덱스나 정렬 최적화 시 사용됨.
- ALL
	- 풀 테이블 스캔 (가장 비효율적)

### possible_keys 컬럼

- 사용 후보였던 인덱스 목록 (무시해도 됨).

### key 컬럼

- 실제 실행 계획에서 선택된 인덱스.

### key_len 컬럼

- 인덱스의 각 레코드에서 몇 바이트를 사용했는지 표시
- 다중 칼럼 인덱스에서 몇 번째 칼럼까지 사용했는지 파악 가능하다.

### ref 컬럼

- 접근 방법이 `ref`일 때 비교 조건으로 어떤 값(상수, 컬럼 등)이 제공되었는지 보여준다.
- `func`라고 나오면 값이 변환/가공된 것이다,.

### rows 컬럼

- 쿼리 처리를 위해 읽고 체크해야 할 것으로 예측되는 레코드 건수.

### filtered 컬럼

- 필터링되고 남은 레코드의 비율(%)
- 이 값이 정확할수록 조인 성능 예측이 정확해진다.

### Extra 컬럼

- const row not found
- Deleting all rows
- Distinct
- FirstMatch
- Full scan on NULL key
- impossible HAVING
- impossible WHERE
- LosseScan
- No matching min/max rows
- no matching row in const table
- No matching rows after partition pruning
- No tables used
- Not exists
- Plan isn't ready yet
- Range checked for each record (index map:N)
- Recursive
- Rematerialize
- Select tables optimized away
- Start temporary, End temporary
- Unique row not found
- Using filesort
- Using index(커버링 인덱스)
- Using index condition
- Using index for group-by
- Using index for skip scan
- Using join buffer(Block Nested Loop), Using join buffer (Batched Key Access), Using join buffer(hash join)
- Using MRR
- Using sort_union, Using union, Using intersect
- Using temporary
- Using where
- Zero limit

### Extra

실행 계획에서 성능과 관련된 중요한 내부 처리 알고리즘이나 메시지를 표시하는 컬럼입니다.

- const row not found
	- `const` 접근 방법으로 테이블을 읽었으나, 실제로 해당 테이블에 레코드가 1건도 존재하지 않는 경우
- Deleting all rows
	- MyISAM 엔진 등에서 WHERE 절 없는 DELETE 문 실행 시, 핸들러 기능을 이용해 모든 레코드를 한 번에 삭제했음을 의미
- Distinct
	- 조인 시 필요한 레코드만 읽고 중복된 값은 무시하며 조회하는 최적화를 수행
- FirstMatch
	- 세미 조인 최적화 중 FirstMatch 전략을 사용하여, 기준 테이블의 레코드에 대해 일치하는 첫 번째 건만 검색하고 멈춤
- Full scan on NULL key
	- IN 서브쿼리 연산 중 왼쪽 피연산자가 NULL인 경우, 차선책으로 서브쿼리 테이블에 대해 풀 스캔을 수행
- Impossible HAVING
	- 쿼리에 사용된 HAVING 절의 조건을 만족하는 레코드가 없을 때(불가능한 조건일 때) 표시
- Impossible WHERE
	- WHERE 조건절이 항상 FALSE가 되어 쿼리 조건을 만족하는 레코드가 하나도 없을 때 표시
- LooseScan
	- 세미 조인 최적화 중 LooseScan 전략(인덱스를 듬성듬성 읽는 방식)이 사용됨
- No matching min/max row
	- MIN()이나 MAX()와 같은 집합 함수가 있는 쿼리의 WHERE 조건절을 만족하는 레코드가 한 건도 없을 때 표시
- no matching row in const table
	- 조인에 사용된 테이블에서 const 방법으로 접근했으나 일치하는 레코드가 없음
- No matching rows after partition pruning
  - 파티션 테이블에서 파티션 프루닝을 수행했으나, 대상 파티션에 삭제/수정할 레코드가 없음
- No tables used
    - FROM 절이 없거나 `FROM DUAL` 형태의 쿼리로, 실제 테이블을 사용하지 않음
- Not exists
	- 아우터 조인을 이용해 안티-조인(Anti-JOIN)을 수행할 때, 일치하는 레코드가 존재하면 더 이상 검색하지 않고 종료하는 최적화를 수행
- Plan isn't ready yet
	- `EXPLAIN FOR CONNECTION` 명령 실행 시, 대상 커넥션에서 아직 쿼리 실행 계획을 수립하지 못한 상태
- Range checked for each record (index map: N)
	- 매 레코드마다 인덱스 사용 여부(레인지 스캔 vs 풀 스캔)를 다시 검토하여 처리,
- Recursive
	- WITH 구문을 이용한 재귀 CTE(Common Table Expression)가 사용됨,
- Rematerialize
	- 래터럴 조인 시 선행 테이블의 레코드별로 서브쿼리를 실행해 결과를 임시 테이블에 새로 저장(구체화)함,
- Select tables optimized away
	- MIN() 또는 MAX()만 조회하거나 GROUP BY 없이 COUNT(*)를 조회하는(MyISAM) 쿼리가 인덱스나 메타데이터만으로 최적화되어 처리됨
- Start temporary, End temporary
	- 세미 조인의 Duplicate Weed-out 최적화 전략 사용 시 중복 제거를 위해 내부 임시 테이블 사용의 시작과 끝을 의미
- unique row not found
	- 두 테이블이 각각 유니크(PK 포함) 칼럼으로 아우터 조인을 수행하나, 아우터 테이블에 일치하는 레코드가 없음
- Using filesort
	- 인덱스를 이용한 정렬이 불가능하여, 조회된 레코드를 소트 버퍼에 복사해 별도로 정렬 작업을 수행
- Using index (커버링 인덱스)
	- 데이터 파일을 읽지 않고 인덱스만 읽어서 쿼리를 모두 처리할 수 있음,
- Using index condition
	- MySQL 옵티마이저가 인덱스 컨디션 푸시 다운(ICP) 최적화를 사용
- Using index for group-by
	- GROUP BY 처리를 위해 별도의 정렬 없이 인덱스를 순서대로 읽거나 듬성듬성 읽는 루스 인덱스 스캔을 사용
- Using index for skip scan
	- 인덱스 스킵 스캔 최적화를 사용하여 인덱스의 선행 칼럼을 건너뛰고 검색
- Using join buffer (Block Nested Loop / Batched Key Access / hash join)
	- 드리븐 테이블에 적절한 인덱스가 없어 조인 버퍼를 사용하며, 뒤에 표시된 알고리즘(해시 조인 등)으로 처리됨,
- Using MRR
	- 여러 개의 키 값을 한 번에 스토리지 엔진으로 전달하고 정렬하여 최소한의 디스크 접근으로 읽는 MRR(Multi Range Read) 최적화를 사용
- Using sort_union, Using union, Using intersect
	- `index_merge` 접근 방법 사용 시 두 개 이상의 인덱스 결과를 병합(합집합, 교집합 등)하는 상세 방식,
- Using temporary
	- 쿼리 처리 중 중간 결과를 담아 두기 위해 임시 테이블(메모리 또는 디스크)을 사용
- Using where
	- 스토리지 엔진에서 읽어온 레코드를 MySQL 엔진 레이어에서 별도로 필터링(체크 조건 처리)함,
- Zero limit
	- 쿼리 마지막에 `LIMIT 0`이 사용되어, 데이터 값은 읽지 않고 결과값의 메타데이터만 반환

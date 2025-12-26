---
title: RealMySQL 아키텍처
aliases:
  - RealMySQL 8.0 4장
description:
permalink: /real-my-sql-architecture
classification: blog
tags:
  - db
  - MySQL
  - RealMySQL
draft: false
published: 2025-12-14
created: 2025-12-09T21:01
updated: 2025-12-26T13:32
---

MySQL 서버
- MySQL 엔진과 스토리지 엔진으로 구분
- 프로세스 기반이 아니라 스레드 기반으로 작동
![|500](https://i.imgur.com/Um4lQlK.png)

### Foreground Thread

- MySQL에 연결된 클라이언트 수만큼 생성되며 각 클라이언트의 쿼리를 처리한다.
- 클라이언트가 연결을 종료하면 스레드는 스레드 캐시로 돌아가며, 캐시 크기는 `thread_cache_size` 로 제한된다.
	- 캐시에 여유가 없으면 스레드는 종료되어 캐시에는 설정된 개수만 유지된다.
- MySQL 버퍼나 캐시에서 데이터를 가져오며, 없으면 디스크에서 직접 읽는다.
	- MyISAM
		- 디스크 쓰기까지 Foreground Thread가 처리한다.
	- InnoDB
		- 버퍼/캐시까지 Foreground Thread가 처리하고, 디스크 기록은 Background Thread가 담당한다.

### Background Thread

- InnoDB는 여러 작업을 백그라운드 스레드가 처리한다.
	- Insert Buffer 병합
	- 로그 기록
	- 버퍼 풀 내용을 디스크에 기록(Write thread)
	- 데이터를 버퍼로 읽어오기(Read thread)
	- 잠금·데드락 모니터링
- 이 중 핵심은 로그 스레드(Log thread) 와 쓰기 스레드(Write thread)
- 읽기/쓰기 스레드 개수를 설정 가능
	- `innodb_write_io_threads`, `innodb_read_io_threads`
- 읽기는 지연될 수 없지만 쓰기는 지연 후 일괄 처리(버퍼링)가 가능하다.
	- InnoDB는 이러한 버퍼링을 지원해 INSERT/UPDATE/DELETE 시 즉시 디스크 기록을 기다리지 않아도 됨.
	- MyISAM은 사용자 스레드가 쓰기까지 처리하므로 버퍼링을 거의 활용할 수 없다.

### 메모리 할당 및 사용 구조

- MySQL 시스템 변수로 설정해 둔 만큼 운영체제로부터 메모리를 할당받는다.
- 글로벌 메모리 영역과 로컬 메모리 영역으로 구분된다.
	- 글로벌 메모리 영역
		- 주로 Background Thread가 사용
	- 로컬(세션) 메모리 영역
		- 주로 Client Thread가 사용

![|500](https://i.imgur.com/Zt2tCgB.png)

### MySQL의 쿼리 실행 구조

- 쿼리 파서
	- 쿼리를 토큰으로 분리해 트리 형태의 구조로 만듬
- 전처리기
	- 파서 트리를 기반으로 구조적인 문제점이 있는 지 확인
- 옵티마이저
	- DBMS의 두뇌 역할, 저렴한 비용으로 가장 빠르게 처리할지를 결정
- 실행 엔진
	- 만들어진 계획대로 각 핸들러들을 연결하는 역할

### InnoDB 스토리지 엔진 아키텍처

- 프라이머리 키에 의한 클러스터링
- 외래 키 지원
- MVCC(Multi Version Concurrency Control)
- Non-Locking Consistent Read
- 자동 데드락 감지
	- 잠금 대기 목록을 그래프(Wait-for List) 형태로 관리
		- 데드락 감지 스레드가 주기적으로 찾아서 강제 종료
			- 기준 : 트랜잭션의 언두 로그 양이 적은 트랜잭션
- 자동화된 장애 복구
	- MySQL 서버가 시작될 때 완료되지 못한 트랜잭션이나 디스크 일부만 기록된 데이터 페이지 등에 대한 일련의 복구 작업이 자동으로 진행
- InnoDB 버퍼 풀
	- 디스크의 데이터 파일이나 인덱스 정보를 메모리에 캐시해 두는 공간
	- 쓰기 작업을 지연시켜 일괄 작업으로 처리할 수 있게 해주는 버퍼 역할
- Double Writer Buffer
	- 정상적으로 기록되면 필요가 없어지지만 기록되는 도중 비정상적으로 종료되었다면, 재시작될 때 항상 DoubleWrite Buffer의 내용과 데이터 파일의 페이지들을 모두 비교해서 복사한다.
- Undo Log
	- 트랜잭션과 격리 수준을 보장하기 위해 DML로 변경되기 이전 버전의 데이터를 별도로 백업한다.
- Change Buffer
	- 변경해야할 인덱스 페이지가 버퍼 풀에 잇으면 바로 업데이트를 수행하지만 그렇지 않고 디스크로부터 읽어와서 업데이트 해야 한다면 임시 공간에 저장해 두고 바로 사용자에게 결과를 반환하는 형태로 성능을 향상시키게 되는데 이때 임시 메모리 공간을 Change Buffer 라고 한다.
		- Change Buffer는 추후 Backgroud Thread에 의해 merge thread 된다.
	- 사용자에게 결과를 전달하기 전에 반드시 중복 여부를 체크해야 하는 유니크 인덱스는 Change Buffer 를 사용할 수 없다.
- Redo Log 및 Log Buffer
- Adaptive Hash Index
	- InnoDB 스토리지 엔진에서 사용자가 자주 요청하는 데이터에 대해 자동으로 생성하는 인덱스

---

### Links

 - [Real MySQL 8.0 (1권)](https://product.kyobobook.co.kr/detail/S000001766482)

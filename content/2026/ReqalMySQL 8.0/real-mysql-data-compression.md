---
title: RealMySQL 데이터 압축
aliases:
  - RealMySQL 8.0 6장
classification: resource
tags:
  - MySQL
url:
description:
permalink:
draft: false
published: 2025-12-28T14:38:00
created: 2025-12-17T13:21
updated: 2025-12-28T14:38
---

### 페이지 압축

- MySQL의 InnoDB 스토리지 엔진은 특정 테이블에 속한 모든 데이터 페이지를 반드시 동일한 크기로 관리해야 한다.
	- 일반적으로 16KB
- MySQL에서는 펀치홀 기능을 활용해 페이지를 압축한다.
	- 파일의 특정 영역의 논리적으로 유지하고, 물리적으로는 디스크 공간을 해제하는 방식
		- ex) 16KB의 페이지를 압축해 7KB가 되었다면 9KB의 공간이 펀치홀
- 펀치홀 기능은 운영체제, 하드웨어 자체, 파일 시스템에서 지원해야하기 때문에 많이 사용되진 않는다.

### 테이블 압축

- 운영체제나 하드웨어에 대한 제약없이 사용 가능
- cons
	- 버퍼 풀 공간 활용률이 낮음
	- 쿼리 처리 성능이 낮음
	- 빈번한 데이터 변경 시 압축률이 떨어짐

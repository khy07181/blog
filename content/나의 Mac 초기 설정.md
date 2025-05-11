---
title: 나의 Mac 초기 설정
aliases: 
description: 
permalink: 
classification: 
tags:
  - mac
  - chezmoi
  - setting
  - env
draft: false
date: 
created: 2025-04-27T19:00:00
updated: 2025-04-27T19:32
---

>[!info]
>마지막 업데이트 날짜 : 2025-04-27

## SSH

 `ln -s ~/Documents/dev/.ssh ~/.ssh`

## brew

`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

## Chezmoi

`sh -c "$(curl -fsLS get.chezmoi.io)" -- init --apply khy07181`

## System Setting

### 데스크탑 및 Dock

- 자동으로 Dock 가리기와 보기 : OFF -> ON
- Dock에서 최근 사용한 응용 프로그램 보기 : ON -> OFF

### 손쉬운 사용

포인터 제어 - 트랙패드 옵션
- 드래그에 트랙패드 사용 ON
- 드래그 스타일 : 세 손가락으로 드래그하기

### 제어 센터

![|500](https://i.imgur.com/Kd1HFOr.png)

시계 옵션
- 전체 OFF, 아날로그로 변경

### ​화면 잠금

- 원하는 시간으로 변경

### Touch ID 및 암호

- Apple watch로 잠금해제 : OFF -> ON

### 인터넷 계정

구글 계정 연결

### 키보드

- 키 반복 속도, 반복 지연 시간 : 가장 빠르고, 짧게 변경

fn 키를 누를 때 실행할 동작
받아쓰기
- 단축키 : 끔

키보드 단축키
- 입력 소스
	- 이전 입력 소스 선택 : F18
	- 입력 메뉴에서 다음 소스 선택 : OFF
- 스크린샷
	- 전체 OFF
- Spotlight
	- OFF
- 기능 키
	- F1, F2 등의 키를 표준 기능 키로 설정 : ON

### 트랙패드

- 무음 클릭 : ON
- 탭하여 클릭하기 : OFF -> ON
- 추가 제스처
	- 앱 Expose
		- 네 손가락 아래로 쓸어내리기

## Finder

보기 - 경로 막대 보기

도구 막대 사용자화

## Itsycal

![|500](https://i.imgur.com/SnKK8Sx.png)

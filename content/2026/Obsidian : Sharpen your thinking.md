---
title: "Obsidian : Sharpen your thinking"
aliases:
cover_image: ""
description: Obsidian 소개
permalink:
classification: blog
category:
  - knowledge-management
tags:
  - obsidian
  - productivity
  - note-taking
  - pkm
  - tool
  - second-brain
draft: false
published: 2026-03-15T23:35:00
lang: ko
created: 2026-03-15T00:00
updated: 2026-04-20T16:39
---

[Obsidian](https://obsidian.md/)은 로컬 기반의 마크다운 노트 앱이자, 지식 관리 도구다.

노트 앱은 수없이 많지만 Obsidian이 특별한 이유는 그 [Manifesto](https://obsidian.md/about)에 있다.

| keyword         | description                                |
| --------------- | ------------------------------------------ |
| **Yours**       | 모든 사람이 명확하게 생각하고 아이디어를 정리할 도구를 무료로 가져야 한다. |
| **Durable**     | 플레인 텍스트와 오픈 파일 포맷을 사용하여 플랫폼에 종속적이지 않아야 한다. |
| **Private**     | 데이터가 사용자의 기기에 저장되며, E2E 암호화를 지원한다.         |
| **Malleable**   | 사용자의 사고방식에 맞게 자유롭게 커스터마이징할 수 있다.           |
| **Independent** | 외부 투자자 없이 사용자의 지원만으로 운영된다.                 |

---

## 옵시디언 특징

### 로컬 기반 Markdown

모든 노트는 `.md` 플레인 텍스트 파일로 저장된다. Obsidian이 아닌 VS Code, Vim 등 어떤 에디터에서든 자유롭게 열고 편집할 수 있다.

파일이 로컬에 저장되기 때문에 속도가 매우 빠르다. 클라우드 기반 노트 앱에서 느껴지는 동기화 지연이나 로딩 시간이 없다.

무엇보다 플랫폼 종속성이 없다. 서비스가 종료되더라도 파일은 그대로 남는다. Notion이나 Evernote처럼 플랫폼에 데이터가 묶이는 구조가 아니기 때문에, 언제든 다른 도구로 옮겨갈 수 있다. 이것이 Obsidian의 가장 큰 차별점이다.

### 커뮤니티 플러그인

![[obsidian_community_plugin.png]]

Obsidian은 기본적으로 코어 플러그인도 제공하지만 수천 개의 커뮤니티 플러그인과 오픈 API를 제공한다. 어떤 플러그인을 설치하느냐에 따라 완전히 다른 도구가 된다. 단순한 메모장에서부터 프로젝트 관리 도구, 데이터베이스 등 무엇이든 가능하다.

대표적인 커뮤니티 플러그인을 몇 가지 소개하면 다음과 같다.

- **Calendar** — 일별 노트를 달력 형태로 관리
- **Kanban** — 칸반 보드로 태스크 관리
- **Dataview** — 노트를 데이터베이스처럼 쿼리하여 동적 리스트/테이블 생성
- **Templater** — 변수와 함수를 활용한 고급 템플릿
- **Excalidraw** — 노트 안에서 바로 다이어그램과 스케치 작성

### 노트 간 연결

Obsidian에서는 `[[위키링크]]` 문법으로 노트 간 양방향 연결을 만들 수 있다. 이 연결이 쌓이면서 자연스럽게 지식 네트워크가 형성된다.
- 제목, 문단 등 특정 부분만 연결하는 것도 가능하다.

Graph View는 이 연결 관계를 시각적으로 보여주는 기능이다. 노트가 많아질수록 그래프가 풍성해지면서, 자신의 지식이 어떻게 연결되어 있는지 한눈에 파악할 수 있다.
Backlink은 역방향 링크로, 특정 노트를 참조하는 모든 노트를 자동으로 추적해준다.

이러한 연결 기능들을 활용하면 마치 개인 위키피디아를 구축하는 것 같은 경험을 할 수 있다.

![[obsidian_graph_view.gif]]

그에 비해 아직 귀여운 내 그래프 뷰

![[obsidian_graph_view_me.png|500]]

---

## 주요 기능

### [Sync](https://obsidian.md/sync)

Obsidian에서 제공하는 유료 동기화 서비스로, E2E 암호화와 버전 히스토리를 지원한다.
iCloud, Google Drive, Dropbox 같은 클라우드 스토리지를 활용하면 무료로 동기화할 수도 있다.

### [Publish](https://obsidian.md/publish)

노트를 온라인 위키나 블로그 형태로 바로 배포할 수 있는 유료 서비스이다. 커스텀 도메인, 비밀번호 보호, SEO 최적화를 지원한다.
- 공식 지원 이외에도 [Quartz](https://quartz.jzhao.xyz/)나 [Digital Garden](https://dg-docs.ole.dev/)과 같은 서비스를 통해서 웹 형태로 배포할 수도 있다.

### [Canvas](https://obsidian.md/canvas)

무한 캔버스 공간에서 리서치, 브레인스토밍, 다이어그램 작업을 할 수 있다. 이미지, 멀티미디어, 웹 콘텐츠를 임베드하고, 노트 카드를 배치하고 연결하면서 아이디어를 시각적으로 정리할 수 있다.

![[obsidian-canvas-cookies.png]]

### [Bases](https://help.obsidian.md/bases)

커뮤니티 플러그인인 Dataview의 공식 대체 기능으로, 노트를 데이터베이스/테이블 뷰로 관리할 수 있다. frontmatter 속성을 컬럼으로 표시하고, 셀을 편집하면 YAML이 자동으로 업데이트된다.
- 프로젝트 관리, 독서 목록, 콘텐츠 캘린더 등에 활용할 수 있다.

![[bases-noshadow.png]]
![[obsidian_bases.png]]

### [Web Clipper](https://obsidian.md/clipper)

브라우저 확장 프로그램을 통해 웹 콘텐츠를 Obsidian 노트로 캡처할 수 있다. 웹 페이지의 전체 또는 일부를 마크다운으로 변환하여 저장한다.

![[obsidian_web_clipper.png]]

### [CLI](https://obsidian.md/cli)

터미널에서 노트 읽기, 검색, 쓰기가 가능한 커맨드라인 인터페이스이다. Daily note 열기, 태스크 관리, 템플릿을 활용한 노트 생성 등을 지원한다. GUI 없이 Obsidian Sync를 실행할 수 있어서 서버나 자동화 환경에서 유용하고, AI 에이전트 도구와의 연동도 가능하다.

![[obsidian_cli.png]]

### [Mobile](https://obsidian.md/mobile)

iOS와 Android 앱을 제공한다. 데스크톱과 동일한 플러그인과 테마를 지원하며, Sync 또는 클라우드 스토리지를 통해 동기화할 수 있다.

![[obsidian_mobile.png]]

---

## 마무리

Obsidian은 단순히 Markdown으로 메모를 작성하는 도구에서 끝나지 않는다.
Markdown은 시작점일 뿐이며, 핵심은 노트들을 서로 연결하고 구조화하여 필요할 때 다시 꺼내 활용할 수 있는 지식의 구조를 만드는 데 있다.

이런 관점에서 Obsidian은 단순한 기록 도구가 아니라 생각을 확장하고 정리하는 [Second Brain](https://www.buildingasecondbrain.com/) 도구에 가깝다.

AI가 빠르게 발전하는 지금, 흩어지는 생각과 나만의 지식을 기록하고 연결해 두는 일은 점점 더 중요해지고 있다.

### Related Posts

- [[building-blog-with-obsidian-and-quartz|Obsidian과 Quartz로 블로그 만들기]]
- [[PARA Method]]

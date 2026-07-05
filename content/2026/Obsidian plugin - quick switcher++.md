---
title: Obsidian plugin - quick switcher++
aliases:
  - Quick Switcher++
  - Switcher++
cover_image: ""
description: Obsidian Quick Switcher++ 플러그인 소개
permalink: obsidian-plugin-quick-switcher-plus-plus
classification: blog
category:
  - knowledge-management
  - tool
tags:
  - obsidian
  - productivity
  - note-taking
  - pkm
  - tool
  - plugin
draft: false
published: 2026-05-24T20:45:00
lang: ko
created: 2026-05-24T20:45
updated: 2026-05-24T21:24
---

[Quick Switcher++](https://github.com/darlal/obsidian-switcher-plus)는 Obsidian의 기본 [Quick Switcher](https://obsidian.md/help/plugins/quick-switcher)(`cmd + o`)를 확장해주는 커뮤니티 플러그인이다.

Obsidian을 처음 사용할 때는 파일 이름으로 노트를 찾는 것만으로도 충분하다. 하지만 vault에 노트가 쌓이고, 하나의 노트 안에 여러 섹션이 생기기 시작하면 파일 단위 검색만으로는 답답해진다.

찾고 싶은 것은 파일 자체가 아니라 특정 헤더, 링크, 태그, 열려 있는 패널, 혹은 방금 보던 노트와 관련된 다른 노트인 경우가 많기 때문이다.

Quick Switcher++는 단순히 파일을 빠르게 여는 도구를 넘어서, Obsidian 안에서 이동하는 방식을 더 세밀하게 만들어주는 탐색 인터페이스에 가깝다.

---

## 왜 필요한가

Obsidian의 기본 Quick Switcher는 빠르게 파일을 여는 기능이다. 파일 제목을 알고 있을 때는 충분히 빠르고 단순하다.

다만 노트가 많아질수록 검색의 기준이 파일명에서 점점 멀어진다.

예를 들어 어떤 개념을 적어둔 것은 기억나지만 파일 제목은 기억나지 않을 수 있다. 긴 글을 쓰다가 특정 섹션으로 바로 이동하고 싶을 수도 있다. 여러 탭을 열어놓고 작업하다가 방금 열어둔 노트나 사이드 패널로 돌아가고 싶을 수도 있다.

이런 상황에서는 파일명 검색보다 "현재 작업 흐름 안에서 어디로 이동하고 싶은가"가 더 중요하다.

Quick Switcher++는 기본 Quick Switcher의 가벼운 사용감을 유지하면서, 검색 대상을 파일 밖으로 확장한다.

---

## 주요 기능

### Recent tabs

![[quick_switcher_recent_tabs.png]]
- 기본 standard 모드로 키면 최근 노트가 표시된다.

### Search Headings

![[quick_switcher_search_headings.gif]]

- 기본 Quick Switcher는 파일명을 기준으로 검색하지만, heading을 기준으로도 검색할 수 있다.
- 기본 설정에서는 `#`를 입력하면 Headings mode로 전환된다.

### Symbol Navigation

![[quick_switcher_symbol_navigation.gif]]
- Quick Switcher++는 현재 파일이나 선택한 파일 안의 symbol도 검색할 수 있다.
	- 기본 trigger는 `@`다.
- symbol은 헤더뿐 아니라 태그, 링크, 임베드, callout, canvas node 등을 포함한다.
	- 즉 노트 안의 구조를 작은 아웃라인처럼 보고, 그 중 원하는 위치로 바로 이동할 수 있다.

### Editor Navigation

![[quick_switcher_navigate_open_editors.png]]
- 기본 trigger인 `edt `를 사용하면 현재 열려 있는 editor나 side panel 사이를 이동할 수 있다.
- Obsidian에서 작업하다 보면 파일 탐색기, backlinks, outline, local graph, 여러 개의 노트 탭이 동시에 열려 있을 때가 많다. 이때 마우스로 탭을 찾는 대신 검색으로 바로 이동할 수 있다.
- 노트를 많이 열어두고 글을 쓰거나, 참고 자료를 여러 개 펼쳐놓고 정리하는 사람이라면 특히 유용하다.

### Run Commands

![[quick_switcher_command.png]]
- `>` trigger를 사용하면 Obsidian command도 검색해서 실행할 수 있다.
- Command Palette와 역할이 겹치지만, Quick Switcher++ 안에서 파일 이동, 헤더 이동, 명령 실행이 같은 인터페이스로 이어진다는 점이 다르다.

### Search Related Items

![[quick_switcher_relative_items.png]]
- `~` trigger를 사용하면 선택한 노트와 관련된 항목을 볼 수 있다.
- 관련 항목에는 outgoing link, backlink, 같은 파일 시스템 위치의 노트 등이 포함된다.
- Graph View는 전체 구조를 보는 데 좋지만, 실제 작업 중에는 지금 보고 있는 노트와 직접 연결된 몇 개의 노트만 빠르게 확인하고 싶을 때 유용하다.

---

### 주요 Trigger

| trigger  | mode                   |
| -------- | ---------------------- |
| `#`      | 헤더 검색                  |
| `@`      | 선택한 파일 또는 현재 파일의 심볼 검색 |
| `edt `   | 열린 editor와 panel 검색    |
| `>`      | Obsidian command 검색    |
| `~`      | 관련 항목 검색               |
| `+`      | Workspace 검색           |
| `'`      | Bookmark 검색            |
| `vault ` | Vault 열기               |

모든 기능을 처음부터 다 쓸 필요는 없지만 `#`, `@`, `edt ` 정도만 익숙해져도 충분히 가치가 있다.
나머지는 작업 방식에 맞게 천천히 붙여가면 된다.

---

### 마무리

Quick Switcher++는 화려한 기능을 추가한다기보다, Obsidian에서 가장 자주 하는 행동인 이동을 더 정교하게 만들어준다.

파일을 찾고, 긴 노트 안의 섹션으로 들어가고, 열려 있는 탭으로 돌아가고, 관련 노트를 확인하는 흐름이 하나의 switcher 안에서 이어진다.

Obsidian을 단순 메모장처럼 쓸 때는 없어도 괜찮다. 하지만 vault가 커지고, 노트 간 연결과 긴 문서를 많이 다루기 시작하면 기본 Quick Switcher만으로는 부족한 순간이 온다.

그때 가장 먼저 설치해볼 만한 플러그인 중 하나가 Quick Switcher++라고 생각한다.

---

### Links

- [Quick Switcher++ GitHub](https://github.com/darlal/obsidian-switcher-plus)
- [Quick Switcher++ Obsidian Plugin](obsidian://show-plugin?id=darlal-switcher-plus)

### Related Posts

- [[Obsidian : Sharpen your thinking]]

---
title: Hookmark - Links beat searching
aliases:
  - Hookmark 소개글
cover_image: ""
description: 흩어진 파일, 메일, 웹페이지를 링크로 연결해주는 macOS 도구 Hookmark 소개
permalink: hookmark-links-beat-searching
classification: blog
category:
  - productivity
  - tool
tags:
  - hookmark
  - productivity
  - linking
  - bookmark
  - macos
  - tool
draft: false
published: 2026-08-02T22:31:00
lang: ko
created: 2026-08-02T22:31
updated: 2026-08-02T23:37
---

[Hookmark](https://hookproductivity.com/)는 macOS에서 파일, 이메일, 웹페이지, 노트, 태스크처럼 서로 다른 앱에 흩어져 있는 항목들을 링크로 연결해주는 도구다.

공식 슬로건은 `Links beat searching`이다. 필요한 자료를 그때그때 검색해서 찾는 대신, 관련된 것들을 미리 연결해두고 클릭 한 번으로 오가게 하자는 것이 이 도구가 하려는 일의 전부다. 기능이 많은 앱은 아니지만, 이 하나의 아이디어를 macOS 전반에 걸쳐 꽤 집요하게 구현해두었다.

---

## 검색은 반복되고, 링크는 남는다

어떤 작업이든 관련 자료는 한곳에 모여 있지 않다. 문서는 Finder 어딘가에 있고, 논의 내용은 회의록에 있고, 참고 자료는 브라우저 탭에, 할 일은 태스크 관리 도구에 있다. 작업을 다시 잡을 때마다 이것들을 각자의 앱에서 다시 찾아내는 일부터 시작하게 된다. 파일명이 기억나지 않으면 파일 탐색기를 뒤지고, 메일은 보낸 사람과 대략의 날짜로 검색하는 식이다.

문제는 이 검색이 한 번으로 끝나지 않는다는 점이다. 같은 자료를 다음 주에도, 다음 달에도 다시 찾는다. 검색은 필요할 때마다 반복해서 지불하는 비용이고, 링크는 한 번 만들어두면 계속 쓸 수 있는 자산이다. Hookmark는 이 반복되는 검색을 링크 만들기라는 일회성 작업으로 바꿔준다.

Obsidian을 쓰다 보면 `[[위키링크]]`로 노트를 연결하는 방식에 익숙해지는데, 이 연결은 vault 안에서만 유효하다. 노트에서 메일로, 메일에서 PDF로는 이어지지 않는다. Hookmark는 이 연결이라는 개념을 vault 밖, OS 전체로 확장한 도구라고 이해하면 가장 빠르다.

---

## 어떻게 동작하는가

![[hookmark_link.png |1000]]

사용의 시작점은 컨텍스트 창 하나다. 어떤 앱에서든 전역 단축키(기본값은 `⌃H`, 또는 `⇧⌘Space`)를 누르면, 지금 보고 있는 항목(열어둔 문서, 읽고 있는 메일, 보고 있는 웹페이지)을 인식한 작은 창이 뜬다. 이 창에는 현재 항목과 함께, 그 항목에 연결해둔(hooked) 다른 항목들이 목록으로 보인다. 창 안에서 화살표 키로 연결된 항목을 따라 계속 이동할 수도 있다.

핵심 명령은 세 가지다.

**Copy Link**는 현재 항목을 가리키는 링크를 복사한다. 웹페이지처럼 원래 URL이 있는 것뿐 아니라 로컬 파일, 메일 한 통, 태스크 하나에 대해서도 링크가 만들어진다. 이 링크를 노트나 태스크 관리자 어디에든 붙여넣으면, 클릭 한 번에 해당 항목이 원래 앱에서 열린다. **Copy Markdown Link**를 쓰면 제목이 포함된 마크다운 형식으로 복사되어서 노트에 붙여넣기 좋다.

**Hook to Copied Link**는 복사해둔 링크와 현재 항목을 서로 연결한다. 이 연결은 양방향이라서, 나중에 어느 쪽에서 Hookmark를 열어도 반대쪽이 목록에 나타난다. 보고서 파일 위에서 창을 열면 관련 메일이 보이고, 그 메일 위에서 열면 보고서가 보이는 방식이다.

**Hook to New**는 현재 항목에 대한 새 노트를 원하는 앱에 만들면서 동시에 연결까지 해준다. 논문 PDF를 읽다가 이 명령을 실행하면 Obsidian에 새 노트가 생기고, 노트 본문에는 PDF로 돌아가는 링크가 붙고, 둘은 서로 hook으로 연결된다. 자료에 대한 메모를 시작하는 동작이 한 번으로 줄어든다.

hookmark의 양방향 링크
![[hookmark_two_way_link.png]]
---

## 세부적인 완성도

사용해보면 링크 자체의 품질에 신경을 많이 쓴 도구라는 것이 느껴진다.

파일 링크는 macOS의 파일 경로보다 견고하다. 일반적인 파일 링크는 파일을 옮기거나 이름을 바꾸는 순간 깨지지만, Hookmark의 파일 링크는 같은 볼륨 안에서라면 파일을 따라간다. 자료를 정리하면서 폴더 구조를 바꿔도 링크가 살아 있다.

PDF에서는 텍스트를 선택한 위치로 바로 이동하는 deep link를 만들 수 있다. 문서 전체가 아니라 인용한 문장으로 정확히 돌아갈 수 있어서 리서치할 때 특히 유용하다.

지원 앱 범위도 넓다. Apple Mail, Mimestream, Spark 같은 메일 클라이언트, OmniFocus, Things 같은 태스크 관리자, DEVONthink 같은 정보 관리 도구, 그리고 Alfred, Raycast, LaunchBar, Keyboard Maestro 같은 자동화 도구까지 연동된다. 참고로 모든 북마크와 연결 정보는 클라우드가 아니라 로컬에 저장된다.
- 지원하고 있는 앱 목록 - [Link-friendly Mac Apps – Hookmark](https://hookproductivity.com/what-mac-apps-are-compatible-with-hook-app)

>[!info]
>Hookmark는 macOS 전용 앱이다.

---

## Obsidian과 함께 쓰기

Obsidian 사용자라면 Hookmark가 채워주는 빈자리가 명확하다. 노트 사이의 연결은 Obsidian이 이미 잘하지만, 노트와 노트 바깥의 것들(메일, PDF, 웹페이지, 캘린더 일정) 사이의 연결은 Hookmark의 영역이다.

기본 설정에서 Hookmark는 Obsidian 노트에 대해 `obsidian://` 링크를 만들어준다. Copy Link, Copy Markdown Link, Hook to New가 모두 동작하기 때문에, 읽던 자료에서 바로 관련 노트를 만들거나 기존 노트를 자료에 연결하는 흐름이 자연스럽게 이어진다.

링크의 견고함이 더 필요하다면 선택지가 두 가지 있다. [Advanced URI](https://github.com/Vinzent03/obsidian-advanced-uri) 플러그인을 사용하도록 설정하면 노트 frontmatter의 고유 ID 기반으로 링크가 만들어져서 vault 안에서 파일을 옮겨도 링크가 유지되고, `hook://file` 스킴을 사용하면 vault 밖으로 파일을 옮기거나 나중에 다른 도구로 갈아타도 살아남는 링크가 된다. 자세한 내용은 [공식 Obsidian 연동 문서](https://hookproductivity.com/help/integration/using-hook-with-obsidian/)에 정리되어 있다.

지금 작성하고 있는 obsidian 블로그 글에도 Hookmark 관련 링크나 파일들을 hooking 해놓았다.
![[hookmark_hooking.png |1000]]

---

## 가격

무료 버전(Basic)은 다른 사람이 만든 hook 링크를 열고, 브라우저와 메일에서 Copy Link를 쓰는 정도로 제한된다. 이 도구의 핵심인 양방향 연결은 Standard(`$29.99`)부터 가능하고, Pro(`$69.99`)에서는 AppleScript와 단축어를 통한 자동화, URL 정리 규칙 편집, Pinboard 같은 북마크 서비스 연동이 추가된다.

구독제가 아니라 일회성 구매이며, 구매 후 12개월 동안의 업데이트가 포함된다. 12개월이 지나도 앱은 계속 쓸 수 있고, 이후 업데이트를 받고 싶을 때만 갱신하면 된다. 30일 무료 체험이 있으니 결제 전에 워크플로우에 맞는지 충분히 확인해볼 수 있다.

---

## 마무리

Hookmark는 새로운 작업 공간을 만드는 도구가 아니다. 이미 쓰고 있는 앱들은 그대로 두고, 그 환경 사이에 링크를 연결하는 도구다.
링크는 만들어두어야 효과가 있다. 검색은 준비 없이도 되지만 링크는 연결하는 습관이 붙어야 가치가 쌓이는 방식이라서, 처음 몇 주는 의식적으로 `⌃H`를 눌러야 한다. 그 고비를 넘기면, 작업을 다시 잡을 때마다 자료를 처음부터 찾아 헤매던 시간이 사라진 것을 체감하게 된다.

검색이 아니라 연결로 자료를 관리한다는 아이디어에 공감한다면, 한 번 써볼 만한 도구다.

---

### Links

- [Hookmark - Links beat searching](https://hookproductivity.com/)
- [Hookmark Features](https://hookproductivity.com/help/general/features/)
- [Using Hookmark with Obsidian](https://hookproductivity.com/help/integration/using-hook-with-obsidian/)

### Related Posts

- [[Obsidian : Sharpen your thinking]]
- [[Raycast - Your shortcut to everything]]

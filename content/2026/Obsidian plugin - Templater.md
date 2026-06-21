---
title: Obsidian plugin - Templater
aliases:
  - Templater
cover_image: ""
description: Obsidian Templater 플러그인 소개
permalink: obsidian-plugin-templater
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
published: 2026-06-21T23:30:00
lang: ko
created: 2026-06-21T22:56
updated: 2026-06-21T23:24
---

[Templater](https://github.com/SilentVoid13/Templater)는 Obsidian에서 템플릿을 더 유연하게 사용할 수 있도록 해주는 커뮤니티 플러그인이다.

Obsidian에는 기본 Templates 코어 플러그인이 있다. 미리 만들어둔 문서 조각을 현재 노트에 삽입하고, 제목이나 날짜 같은 간단한 값을 넣는 용도라면 기본 기능만으로도 충분하다.

그러나 템플릿을 실제 워크플로우에 붙여 쓰기 시작하면 곧 한계가 보인다.

블로그 글을 만들 때는 제목, permalink, 생성일, 기본 섹션이 필요하다. 데일리 노트에는 날짜와 커서 위치가 중요하다. 독서 노트에는 저자, 카테고리, 읽은 날짜 같은 frontmatter가 들어간다. 매번 손으로 맞추기에는 귀찮고, 이러한 노트들이 늘어나면 형식이 흔들린다.

Templater는 이 지점을 해결한다. 템플릿 안에서 현재 파일 정보, 날짜, 사용자 입력, JavaScript 실행 결과를 계산한 뒤 자동으로 노트에 삽입할 수 있다.

---

## 템플릿이 반복 작업이 되는 순간

템플릿은 처음에는 단순한 복붙 도구처럼 느껴진다.

하지만 노트의 종류가 늘어나면 템플릿은 단순한 양식이 아니라 규칙이 된다. 어떤 노트에는 반드시 `classification`이 있어야 하고, 어떤 노트에는 `tags`가 필요하고, 블로그 글에는 `published`, `description`, `permalink`가 들어가야 한다.

이 규칙이 일정해야 나중에 Dataview로 모아보거나, 검색하거나, 블로그로 발행할 때 덜 삐걱거린다.

문제는 이런 필드 대부분이 매번 조금씩 달라진다는 점이다. 제목은 파일명에서 가져오고 싶고, 생성일은 현재 시간으로 넣고 싶고, 어떤 값은 직접 입력받고 싶다. 여기서부터 기본 Templates만으로는 답답해진다.

Templater는 템플릿을 "고정된 내용"에서 "실행되는 규칙"으로 바꿔준다.

---

## 기본 Templates와 다른 점

기본 Templates는 정해둔 텍스트를 삽입하고, `{{title}}`, `{{date}}`, `{{time}}` 같은 제한된 값만 바꿔준다.

Templater는 `<% %>` 안에서 값을 계산한다.

| 구분     | 기본 Templates           | Templater                      |
| ------ | ---------------------- | ------------------------------ |
| 문법     | `{{date}}`, `{{time}}` | `<% tp.date.now() %>`          |
| 파일 정보  | 제한적                    | 제목, 생성일, 수정일, 태그 등 활용 가능       |
| 사용자 입력 | 어려움                    | prompt, suggester 사용 가능        |
| 조건 분기  | 없음                     | JavaScript로 가능                 |
| 외부 확장  | 제한적                    | User Script, System Command 지원 |

처음부터 모든 기능을 쓸 필요는 없다. Templater의 장점은 간단한 치환부터 시작해서, 필요한 만큼만 자동화 범위를 넓힐 수 있다는 점이다.

---

## 주요 기능

### 파일 정보 넣기

Templater 문법은 `<% %>` 형태를 사용한다.

가장 먼저 유용한 것은 파일 제목과 생성 시간이다.

```md
---
title: <% tp.file.title %>
created: <% tp.file.creation_date("yyyy-MM-DDTHH:mm") %>
---
```

템플릿을 적용하면 `tp.file.title`은 현재 파일 제목으로, `tp.file.creation_date()`는 파일 생성 시간으로 바뀐다.

새 노트를 만들 때 제목과 생성 시간을 매번 직접 적지 않아도 된다.

### 날짜 계산하기

날짜는 템플릿에서 가장 자주 쓰는 값 중 하나다.

```md
오늘: <% tp.date.now("YYYY-MM-DD") %>
어제: <% tp.date.now("YYYY-MM-DD", -1) %>
내일: <% tp.date.now("YYYY-MM-DD", 1) %>
```

데일리 노트에서는 오늘 날짜뿐 아니라 어제와 내일 노트 링크를 같이 만들 수 있다. 주간 회고나 월간 회고 템플릿에서는 기준 날짜를 바탕으로 기간을 계산하는 식으로도 확장할 수 있다.

포맷과 offset을 자유롭게 조합할 수 있어서 날짜 기반 노트를 많이 쓰는 사람에게 특히 유용하다.

### 커서 위치 정하기

템플릿을 적용한 뒤 바로 입력을 시작할 위치를 정할 수 있다.

```md
last cursor point : <% tp.file.cursor() %>
```

데일리 노트처럼 템플릿을 적용한 직후 바로 입력해야 하는 노트에서 체감이 크다. 템플릿을 넣은 뒤 마우스로 본문 위치를 다시 찍는 흐름이 사라진다.

### 사용자 입력 받기

`tp.system.prompt()`나 `tp.system.suggester()`를 사용하면 템플릿 실행 중에 값을 입력받을 수 있다.

예를 들어 새 프로젝트 노트를 만들 때 프로젝트 상태, 카테고리, 우선순위 같은 값을 선택하게 만들 수 있다. 그러면 노트를 만든 뒤 frontmatter를 다시 고치는 일이 줄어든다.

Templater를 QuickAdd와 함께 쓰는 경우에도 이 기능이 유용하다. QuickAdd로 노트 생성 흐름을 시작하고, Templater가 필요한 값을 받아서 파일 내용을 채우는 식으로 역할을 나눌 수 있다.

### 폴더별 템플릿 적용

Templater 설정에서 폴더별 템플릿을 지정할 수 있다.

예를 들어 `blog/content/2026` 폴더에 새 파일을 만들면 블로그 글 템플릿을 적용하고, `private/2_Area/daily/2026` 폴더에 새 파일을 만들면 데일리 노트 템플릿을 적용하는 방식이다.

노트 종류가 폴더 구조와 어느 정도 맞아 있다면 가장 먼저 설정해볼 만한 기능이다. 새 파일을 만든 뒤 템플릿을 고르는 단계가 사라지기 때문이다.

### JavaScript로 확장하기

Templater는 `<%* %>` 문법으로 JavaScript를 실행할 수 있다.

```md
<%* if (tp.file.title.startsWith("Book - ")) { %>
category:
  - book
<%* } else { %>
category:
  - note
<%* } %>
```

이 기능을 사용하면 파일 제목, frontmatter, 태그, 사용자 입력에 따라 결과를 다르게 만들 수 있다.

다만 여기서부터는 템플릿이 꽤 복잡해진다. 처음부터 JavaScript를 많이 넣기보다는 `tp.file`, `tp.date`, `tp.system` 같은 내장 함수로 해결할 수 있는지 먼저 보는 편이 좋다.

---

## 작게 시작하는 방법

Templater는 기능이 많아서 처음부터 제대로 쓰려고 하면 부담스럽다.

가장 추천하는 시작점은 기존에 자주 만드는 노트 하나를 고르는 것이다. 데일리 노트든, 블로그 글이든, 책 노트든 상관없다. 그리고 그 노트를 만들 때 매번 반복해서 입력하는 값을 하나씩 Templater 문법으로 바꾼다.

처음에는 아래 정도면 충분하다.

| 문법 | 용도 |
| --- | --- |
| `<% tp.file.title %>` | 파일 제목 넣기 |
| `<% tp.file.creation_date("yyyy-MM-DDTHH:mm") %>` | 생성 시간 넣기 |
| `<% tp.date.now("YYYY-MM-DD") %>` | 오늘 날짜 넣기 |
| `<% tp.date.now("YYYY-MM-DD", -1) %>` | 하루 전 날짜 넣기 |
| `<% tp.file.cursor() %>` | 입력 시작 위치 정하기 |

이 정도가 익숙해지면 그 다음에 `tp.system.prompt()`로 값을 입력받거나, 폴더별 템플릿을 설정하거나, QuickAdd와 연결해보면 된다.

---

## 주의할 점

Templater는 JavaScript와 시스템 명령을 실행할 수 있다.

이 말은 강력하다는 뜻이지만, 동시에 아무 템플릿이나 그대로 가져와서 실행하면 위험할 수 있다는 뜻이기도 하다.

특히 인터넷에서 복사한 템플릿 안에 파일 삭제, 외부 요청, 시스템 명령 실행 같은 코드가 들어 있다면 실행 전에 반드시 내용을 확인해야 한다.

개인적으로는 다음 정도의 기준을 두고 쓰는 편이 안전하다고 생각한다.

1. `tp.file`, `tp.date` 중심의 단순 치환부터 시작한다.
2. 반복 입력이 생기면 `tp.system.prompt()`나 `suggester()`를 붙인다.
3. 조건 분기나 파일 조작이 정말 필요할 때만 JavaScript를 사용한다.
4. 시스템 명령은 템플릿 안에 넣기 전에 실행 범위를 명확히 확인한다.

---

### 마무리

Templater는 새 노트를 만드는 방식을 바꿔준다.

파일 제목과 생성일을 자동으로 넣는 작은 편의 기능에서 시작하지만, 노트 종류가 늘어나고 frontmatter 형식이 중요해질수록 역할이 커진다. 반복해서 만드는 노트가 있다면 그 반복을 템플릿 안으로 옮길 수 있다.

Obsidian을 가볍게 메모장처럼 쓰고 있다면 없어도 괜찮다. 하지만 vault를 일정한 형식으로 관리하고, 같은 구조의 노트를 자주 만들고, Dataview나 블로그 발행처럼 형식에 의존하는 작업이 있다면 Templater는 금방 핵심 플러그인이 된다.

특히 Dataview, QuickAdd, Linter와 함께 쓰면 노트를 만드는 순간부터 정리하고 활용하는 단계까지 흐름을 꽤 깔끔하게 만들 수 있다.

---

### Links

- [Templater GitHub](https://github.com/SilentVoid13/Templater)
- [Templater Obsidian Plugin Page](https://community.obsidian.md/plugins/templater-obsidian)
- [Templater Obsidian Plugin](obsidian://show-plugin?id=templater-obsidian)
- [Templater Official Documentation](https://silentvoid13.github.io/Templater/introduction.html)
- [Templater 기초: 소개와 기본설정](https://kaminik.tistory.com/entry/Templater-%EC%86%8C%EA%B0%9C%EC%99%80-%EA%B8%B0%EB%B3%B8%EC%84%A4%EC%A0%95)
- [Obsidian 옵시디언, Templater 플러그인](https://olait.tistory.com/14)

### Related Posts

- [[Obsidian : Sharpen your thinking]]
- [[my-obsidian-plugins|내가 사용하고 있는 obsidian 플러그인]]

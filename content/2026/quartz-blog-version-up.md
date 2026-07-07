---
title: Quartz 블로그 4.0에서 5.0으로 버전 업그레이드하기
aliases:
  - Quartz 블로그 4.0에서 5.0으로 버전 업그레이드하기
cover_image: ""
description: Quartz 5.0의 새로운 변화와 v4에서 v5로 블로그를 마이그레이션한 과정
permalink: quartz-blog-version-up
classification: blog
category:
  - dev
tags:
  - quartz
  - blog
  - ssg
  - obsidian
  - upgrade
draft: false
published: 2026-07-05T23:52:00
lang: ko
created: 2026-07-06T22:28:00
updated: 2026-07-06T00:49
---

# 오랜만에 블로그를 손봤다

[[building-blog-with-obsidian-and-quartz|Obsidian과 Quartz로 블로그 만들기]]에서 Quartz로 블로그를 만든 이야기를 했었다.

그게 벌써 작년 초의 일인데, 얼마 전 Quartz가 **4.0에서 5.0으로 메이저 버전 업그레이드**가 되었다는 걸 알게 됐다.

메이저 버전이 올라간 만큼 바뀐 게 꽤 많았고, 이참에 v5로 올려보기로 했다.

결론부터 말하면 잘 넘어왔고, 지금 이 글을 보고 있는 블로그가 바로 v5로 배포된 결과물이다.
- ~~물론 배포 한번 실패해서 재시도했다.~~

이 블로그를 처음 만들 때는 GPT한테 질문해가면서 한땀 한땀 만들었는데
이번 버전 업은 Claude가 다했다.

---

# Quartz 5.0

[Quartz](https://quartz.jzhao.xyz/) 는 Obsidian vault를 publish 할 수 있게 해주는 static site generator 다. 이 블로그도 Quartz로 만들었다.

v5의 방향을 한 줄로 요약하면 **"코어를 가볍게, 플러그인을 생태계로"** 다.

기존 v4는 검색, 그래프 뷰, 백링크 같은 기능이 전부 코어 안에 내장되어 있었다. v5부터는 이런 기능들이 각각 **독립된 커뮤니티 플러그인**으로 분리되어 [quartz-community](https://github.com/quartz-community) 라는 GitHub 조직에서 관리된다.

- 코어는 얇아지고, 플러그인은 각자 버전 관리
- 40개가 넘는 공식 플러그인을 필요한 것만 골라 설치
- 커스텀 플러그인도 npm 패키지처럼 만들어 붙일 수 있음

npm이나 VS Code 확장 같은 생태계를 떠올리면 이해가 쉽다.

---

# 4.0 에서 달라진 점

바뀐 게 많지만, 실제로 마이그레이션하면서 체감한 것들 위주로 정리했다.

| 항목          | v4                                                   | v5                                |
| ----------- | ---------------------------------------------------- | --------------------------------- |
| 플러그인        | 코어 내장                                                | 독립 커뮤니티 플러그인 (`quartz-community`) |
| 설정          | `quartz.config.ts` + `quartz.layout.ts` (TypeScript) | `quartz.config.yaml` (YAML)       |
| 레이아웃        | 별도 `layout.ts` 파일                                    | 각 플러그인의 속성으로 통합                   |
| Obsidian 지원 | wikilink, callout 등                                  | + **Bases**, **Canvas** 페이지까지     |
| URL         | 대소문자·공백 유지                                           | 전부 **소문자 + 하이픈**                  |
| Node        | 20                                                   | **22 이상** (npm 10.9.2+)           |

## 설정이 TypeScript 에서 YAML 로

가장 눈에 띄는 변화다. v4에서 `quartz.config.ts` 와 `quartz.layout.ts` 두 파일로 나눠 관리하던 설정이 v5에서는 `quartz.config.yaml` 하나로 합쳐졌다.

```yaml
# quartz.config.yaml
configuration:
  pageTitle: "🪴 hayoung"
  analytics:
    provider: google
    tagId: G-XXXXXXXXXX
  # ...
plugins:
  - source: github:quartz-community/explorer
    enabled: true
    layout:
      position: left
      priority: 40
  - source: github:quartz-community/graph
    enabled: true
    layout:
      position: right
      priority: 10
```

각 플러그인을 `source` 로 선언하고, `enabled` 로 켜고 끄고, `layout` 으로 위치를 지정한다. 레이아웃이 플러그인 설정 안으로 들어오면서 `quartz.layout.ts` 는 아예 사라졌다.

> [!info]
> 기본 설정만 쓴다면 이제 TypeScript를 몰라도 되고, 에디터에서 JSON Schema 자동완성도 지원한다. 물론 `quartz.ts` 를 통한 고급 JS 커스터마이징은 여전히 가능하다.

## Obsidian Bases 와 Canvas 지원

v5는 Obsidian의 [Bases](https://help.obsidian.md/bases) 와 Canvas 파일까지 페이지로 렌더링해준다. Obsidian을 그대로 publish 한다는 Quartz의 방향성이 더 알맞아졌다.

## 모든 URL 이 소문자로...

이게 이번 업그레이드에서 가장 신경 써야 했던 부분이다.

v4는 파일명의 대소문자와 공백을 URL에 그대로 유지했다. v5는 **모든 URL을 소문자 + 하이픈으로 정규화**한다.

```
# v4
/2025/GRASP-Pattern
/2025/CAP

# v5
/2025/grasp-pattern
/2025/cap
```

대문자나 공백, 한글이 섞인 파일이 많다면 URL이 전부 바뀐다. 즉,

- 기존에 공유된 링크나 검색엔진에 색인된 주소가 깨질 수 있고
- 페이지 경로 기준으로 매핑되는 [giscus](https://giscus.app/ko) 댓글도 새 URL에서는 새 스레드로 시작된다

내 블로그를 딱히 보러 오는 사람도 적고 큰 영향이 없을 것 같아서 그냥 새 URL 형식으로 변경했다.

---

# 버전 업그레이드 과정

메이저 버전 업이라 라이브 블로그를 바로 건드리기엔 부담스러웠다. 그래서 안전하게 단계를 밟았다.

## 1. 격리된 사본에서 먼저 세워보기

라이브 블로그(v4)는 그대로 두고, upstream의 v5 브랜치를 **별도 폴더에 따로 클론**해서 시범 구축했다.

```shell
git clone --depth 1 -b v5 https://github.com/jackyzha0/quartz.git blog-v5
cd blog-v5
npm i
```

content는 늘 하던 대로 vault에 심볼릭 링크로 연결하고, 내 실제 글로 빌드가 되는지부터 확인했다.

```shell
# 기존 content를 vault에 연결
ln -s ~/Library/Mobile\ Documents/iCloud~md~obsidian/Documents/vault/blog/content ./content
npx quartz plugin install   # 커뮤니티 플러그인 설치
npx quartz build --serve    # localhost:8080 에서 미리보기
```

## 2. 내가 커스텀했던 부분 적용하기

문제는 여기서부터였다. 그동안 블로그를 운영하면서 이것저것 커스텀을 많이 해뒀는데, v5는 구조가 달라서 그대로 옮겨지지 않았다.

git 커밋 이력을 작성자 기준으로 뒤져서 내가 실제로 손댄 것들을 전부 추려냈다.

- 연도/태그 탭이 있는 **커스텀 Explorer**
- 사이드바 **SocialIcons** (RSS / Email / GitHub)
- 링크 **포인트 컬러**
- 메인 페이지 **최근 글 목록** (index에서만, 표시 순서 커스텀)
- **날짜 포맷** (`YYYY-MM-DD`)
- **구글 사이트 인증** 메타 태그

v5에서는 이런 커스텀 컴포넌트들을 **로컬 플러그인**으로 만들어 붙였다. `plugins/` 폴더에 패키지처럼 두고 `source: ./plugins/social-icons` 처럼 참조하면 된다.

## 3. 마주친 함정들

여기서부터가 진짜 삽질의 영역이었다. ~~그리고 이 글의 존재 이유~~
- 물론 나의 삽질이 아닌 claude의 삽질

**① `note-properties` 플러그인이 사실 프론트매터 파서였다**

처음에 "속성 표는 v4에 없었으니 끄자" 하고 `note-properties` 를 비활성화했더니, 갑자기 제목도 태그도 날짜도 전부 사라졌다. 알고 보니 v4의 `Plugin.FrontMatter()` 역할이 이 플러그인에 통합되어 있었다. 즉 **끄면 안 되는 필수 플러그인**이었던 것.

표만 숨기고 파싱은 유지하려면 이렇게 하면 된다.

```yaml
  - source: github:quartz-community/note-properties
    enabled: true
    options:
      hidePropertiesView: true   # 파싱은 하되 속성 표는 숨김
```

**② 함수 옵션은 `quartz.ts` 에서 주입**

"최근 글 목록에서 index 페이지 제외" 같은 필터는 함수라서 YAML로는 표현이 안 된다. v5에는 이런 걸 위한 옵션 주입 API가 있었다.

```ts
// quartz.ts
import { componentRegistry } from "./quartz/components/registry"

componentRegistry.setOptionOverrides("recent-notes", {
  filter: (f) => f.slug !== "index",
})
```

**③ 빌드 스크립트에서 `new Date()` 금지**

커스텀 Explorer가 "현재 연도 폴더를 자동으로 펼치는" 기능을 `new Date().getFullYear()` 로 구현했었는데, v5 빌드는 재현성을 위해 `new Date()` / `Date.now()` 를 막아뒀다. 그래서 **트리에서 가장 큰 연도 폴더를 펼치는** 방식으로 바꿨다. 어차피 결과(최신 연도가 열림)는 같으니 오히려 더 깔끔해졌다.

## 4. 배포 실패 수정

로컬에서 다 확인하고 v5 브랜치를 push했더니, 빌드는 성공했는데 **배포 단계에서 막혔다.**

```
Branch "v5" is not allowed to deploy to github-pages
due to environment protection rules.
```

`github-pages` 환경이 기존 배포 브랜치(v4)만 허용하도록 설정되어 있어서였다. 새 브랜치를 배포 허용 목록에 추가하니 바로 통과했다.

> [!tip]
> GitHub Pages를 Actions로 배포하고 있다면, 배포 브랜치를 바꿀 때 저장소 → Settings → Environments → `github-pages` 의 deployment branch 설정도 함께 확인하자.

그 외에 배포 워크플로우에는 v5에서 커뮤니티 플러그인을 받아오는 단계가 필요해서 한 줄 추가했다.

```yaml
      - name: Install Quartz plugins
        run: npx quartz plugin install
      - name: Build Quartz
        run: npx quartz build
```

---

# 마무리

메이저 버전 업이라 각오는 했지만, 커스텀을 많이 해둔 탓에 생각보다 손이 많이 갔다. 그래도 격리된 사본에서 충분히 검증하고 넘어온 덕분에 라이브는 무중단으로 넘어왔다.

v5의 커뮤니티 플러그인 생태계는 방향성이 마음에 든다. 코어가 얇아지니 업데이트 부담이 줄고, 필요한 기능만 골라 쓰거나 직접 만들어 붙이기도 수월해졌다. 반대로 커스텀이 많으면 마이그레이션 비용이 그만큼 커진다는 것도 확실히 체감했다.

정리하자면,

- 커스텀이 거의 없다면 v5 업그레이드는 어렵지 않다
- 커스텀이 많다면 **격리된 사본에서 충분히 검증한 뒤** 넘어오는 걸 추천
- URL이 대문자를 포함한다면 소문자로 변경해야한다.
- Claude 짱

# Links

- [Quartz](https://github.com/jackyzha0/quartz)
- [Welcome to Quartz 5](https://quartz.jzhao.xyz/)
- [What's New in Quartz 5](https://quartz.jzhao.xyz/getting-started/whats-new)
- [Migrating from v4 to v5](https://quartz.jzhao.xyz/getting-started/migrating)

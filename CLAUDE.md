# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고할 가이드를 제공합니다.

## 개요

이 저장소는 **Quartz v5**로 구축된 개인 블로그입니다. Quartz는 Obsidian 호환 Markdown 파일을 웹사이트로 변환하는 정적 사이트 생성기입니다.

글은 iCloud의 Obsidian vault에서 작성하고, `publish.sh`로 vault의 글을 `content/`(실제 파일)로 복사·커밋·푸시하여 게시합니다. 실제 배포는 GitHub Actions가 수행합니다("배포" 섹션 참고).

- **주 브랜치: `v5`** (Quartz 5.0) — GitHub 기본 브랜치이자 배포 브랜치
- `v4`는 레거시 브랜치이며 자동 배포는 비활성화되어 있음 (Quartz 4.x)
- 배포 사이트: https://khy07181.github.io/

## 개발 명령어

### 빌드 및 서빙
```bash
# 커뮤니티 플러그인 설치 (최초 1회 / 플러그인 변경 시)
npm run install-plugins        # = npx tsx ./quartz/plugins/loader/install-plugins.ts

# 사이트 빌드
npx quartz build

# 라이브 리로드와 함께 빌드 및 서빙 (포트 8080)
npx quartz build --serve
```

### 발행 (콘텐츠 게시)
```bash
./publish.sh            # vault(Obsidian) 글을 v5로 발행 → CI가 빌드·배포
./publish.sh preview    # 발행 없이 로컬 미리보기 (vault 반영 후 serve)
./publish.sh sync       # vault→content 동기화만 (커밋·푸시 안 함)
```

### 코드 품질
```bash
npm run check     # tsc --noEmit && prettier --check
npm run format    # prettier --write
npm run test      # tsx --test
```

## 배포 (중요)

- 배포는 **GitHub Actions**(`.github/workflows/deploy.yml`)가 수행합니다. `v5` 브랜치에 push되면 CI 러너에서 `npx quartz build`를 실행하고 결과(`public/`)를 GitHub Pages로 업로드합니다. (gh-pages 브랜치 없음, Pages `build_type: workflow`)
- **CI가 커밋된 `content/`를 빌드하므로 `content/`는 git에 실제 파일로 존재해야 합니다.** CI 러너에는 로컬 iCloud vault가 없으므로, `content`를 vault로 심볼릭 링크하면 빈 사이트가 배포됩니다 → **심링크 금지.**
- 게시 흐름: **vault에서 편집 → `./publish.sh` → CI 배포.** (구 `npx quartz sync` 방식은 쓰지 않음)
- `public/`은 `.gitignore` 처리됨 (CI가 생성).
- `v4`의 배포 워크플로(`deploy.yml`, `default.yml`)는 트리거가 `workflow_dispatch`(수동)로 바뀌어 자동 배포가 꺼져 있습니다. v4로 push해도 라이브가 바뀌지 않습니다.

## 아키텍처

### 정적 사이트 생성 파이프라인
Quartz는 transformer → filter → emitter 파이프라인을 따릅니다:
1. **Transformers**: Markdown을 AST로 처리 (frontmatter, 구문 강조, LaTeX, wikilink 변환 등)
2. **Filters**: 초안/미게시 콘텐츠 필터링
3. **Emitters**: HTML 페이지, RSS, 사이트맵, 정적 에셋 생성

### 플러그인 시스템 (v5)
v5에서는 플러그인을 **커뮤니티 플러그인**으로 분리해 `quartz.config.yaml`의 `plugins:`에서 선언하고(`order`로 순서 지정), `quartz.lock.json`으로 커밋을 고정합니다. (v4의 `quartz.config.ts` 플러그인 배열을 대체)

주요 체인 (v4 순서 유지): `head-meta`(로컬) → created-modified-date → syntax-highlighting → obsidian-flavored-markdown → github-flavored-markdown → table-of-contents → crawl-links → description → latex

커뮤니티 플러그인은 `npm run install-plugins`(또는 `prebuild` 훅)로 `quartz.lock.json`에 고정된 버전을 설치합니다.

### 로컬 커스텀 플러그인 (`plugins/`)
v4의 커스텀 컴포넌트가 v5에서는 저장소 루트 `plugins/`의 로컬 플러그인으로 이전됨:
- **`head-meta`**: 커스텀 `<head>` 메타 주입 (구 `Head.tsx`)
- **`social-icons`**: 사이드바 RSS/Email/GitHub 아이콘 (구 `SocialIcons.tsx`)
- **`recent-notes`**: 인덱스 페이지에서만 최근 게시물 표시 (구 `RecnetNotesForIndex.tsx`)
- **`content-meta`**, **`explorer`**

### 컴포넌트 시스템
컴포넌트(`quartz/components/`)는 Preact 기반이며 정적 HTML로 렌더링됩니다. `.css`(번들 스타일), `.beforeDOMLoaded`(head 로드), `.afterDOMLoaded`(body 이후 로드) 스크립트를 선언할 수 있습니다.

### 설정 파일
- **`quartz.config.yaml`**: 사이트 설정 + 레이아웃 + 플러그인을 담은 단일 YAML (v4의 `quartz.config.ts` + `quartz.layout.ts`를 대체). 상단에 스키마(`quartz-plugins.schema.json`) 참조.
- **`quartz.lock.json`**: 커뮤니티 플러그인 버전 잠금

### 콘텐츠 구조
- `content/`는 git에 커밋되는 **실제 파일** (심링크 아님)
- 원본은 iCloud Obsidian vault: `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault/blog/content`
- `./publish.sh`가 vault→`content/`를 rsync(내용 기준, `.gitkeep` 보존)한 뒤 커밋·푸시
- frontmatter `draft: true` 파일과 `ignorePatterns`(private, templates, .obsidian)는 제외

## 주요 커스터마이징
- **댓글**: giscus (`github:quartz-community/comments`, provider giscus)
- **분석**: Google Analytics (G-5LV1MFRSYJ)
- **테마**: 라이트/다크 커스텀 색상 스킴
- **폰트**: Schibsted Grotesk(헤더), Source Sans Pro(본문), IBM Plex Mono(코드)
- **robots.txt**: v5에는 robots emitter가 없어 `deploy.yml`에서 인라인 생성
- og-image 생성은 비활성화(`generateSocialImages: false`)

## 버전
- Node: **v22.16.0** (`.node-version`), NPM >=9.3.1
- Quartz: **5.0.0** (`package.json`)

## TypeScript 설정
- JSX 런타임: Preact (`jsxImportSource: "preact"`)
- 모듈 시스템: ESNext (node resolution), Strict 모드 활성화

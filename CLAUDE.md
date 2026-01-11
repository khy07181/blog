# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고할 가이드를 제공합니다.

## 개요

이 저장소는 Quartz v4로 구축된 개인 블로그입니다. Quartz는 Obsidian 호환 Markdown 파일을 웹사이트로 변환하는 정적 사이트 생성기입니다. content 디렉토리는 Obsidian vault에 심볼릭 링크되어 있어, Obsidian에서 콘텐츠를 작성하고 Quartz를 통해 자동으로 게시할 수 있습니다.

배포 사이트: https://khy07181.github.io/

## 개발 명령어

### 빌드 및 서빙
```bash
# 사이트 빌드
npx quartz build

# 라이브 리로드와 함께 빌드 및 서빙 (포트 8080)
npx quartz build --serve

# 문서 사이트 빌드
npm run docs
```

### 배포
```bash
# GitHub Pages로 배포 (빌드 및 푸시)
npx quartz sync

# sync는 다음 작업을 자동으로 수행합니다:
# 1. 사이트 빌드 (npx quartz build)
# 2. public/ 디렉토리 내용을 GitHub Pages 브랜치로 커밋 및 푸시
```

### 코드 품질
```bash
# 파일 생성 없이 타입 체크
npm run check

# Prettier로 코드 포맷팅
npm run format

# 테스트 실행
npm run test
```

### 기타 명령어
```bash
# 성능 프로파일링
npm run profile
```

## 아키텍처

### 정적 사이트 생성 파이프라인

Quartz는 transformer → filter → emitter 파이프라인을 따릅니다:

1. **Transformers** (`quartz/plugins/transformers/`): Markdown 파일을 AST로 처리
   - frontmatter 파싱, 구문 강조 적용, LaTeX 처리, wikilink 변환
   - Obsidian-flavored 및 GitHub-flavored Markdown 지원

2. **Filters** (`quartz/plugins/filters/`): 원하지 않는 콘텐츠 필터링
   - 초안 또는 미게시 파일 제거

3. **Emitters** (`quartz/plugins/emitters/`): 출력 파일 생성
   - HTML 페이지, RSS 피드, 사이트맵, 정적 에셋 등 생성

### 컴포넌트 시스템

컴포넌트(`quartz/components/`)는 Preact 기반이지만 정적 HTML로 렌더링됩니다. 컴포넌트는 다음을 선언할 수 있습니다:
- `.css`: 번들링될 스타일
- `.beforeDOMLoaded` 스크립트: `<head>`에 로드되는 중요 JS
- `.afterDOMLoaded` 스크립트: body 이후에 로드되는 비중요 JS

### 설정 파일

- **`quartz.config.ts`**: 메인 사이트 설정 (제목, 테마, 분석, 플러그인)
- **`quartz.layout.ts`**: 페이지 레이아웃 정의 (공유 컴포넌트, 콘텐츠 페이지 레이아웃, 목록 페이지 레이아웃)

### 콘텐츠 구조

- 콘텐츠는 `./content`에 심볼릭 링크된 Obsidian vault에 저장됨
- frontmatter에 `draft: true`가 있는 파일은 제외됨
- `ignorePatterns` 설정의 패턴은 제외됨 (private/, templates/, .obsidian/)

### 빌드 프로세스

`npx quartz build` 실행 시:
1. CLI bootstrap (`quartz/bootstrap-cli.mjs`)이 인자를 파싱
2. TypeScript/SCSS가 esbuild로 트랜스파일됨
3. 콘텐츠 파일이 glob되고 파싱됨 (128개 이상 파일 시 워커 스레드 사용)
4. Markdown → mdast → hast → JSX → 정적 HTML (unified/remark/rehype 파이프라인)
5. Preact 컴포넌트가 `preact-render-to-string`으로 정적 렌더링됨
6. CSS가 Lightning CSS로 최소화됨
7. 출력이 `public/`에 작성됨

### 커스텀 컴포넌트

- **`RecnetNotesForIndex.tsx`**: 인덱스 페이지에서만 최근 게시물 표시 (RecentNotes를 래핑)
- **`SocialIcons.tsx`**: 소셜 미디어 링크 (이 블로그에 맞게 커스터마이징)
- **커스텀 Robots emitter**: postquartz 스크립트를 통해 robots.txt 생성

## 주요 커스터마이징

이 블로그는 기본 Quartz에서 다음과 같이 커스터마이징되었습니다:

1. **댓글**: giscus를 통한 GitHub 기반 댓글 통합 (`quartz.layout.ts`에 설정)
2. **분석**: Google Analytics 추적 (G-5LV1MFRSYJ)
3. **커스텀 RecentNotes**: `RecnetNotesForIndex` 컴포넌트를 통해 인덱스 페이지에서만 최근 게시물 표시
4. **테마**: 라이트 모드와 다크 모드를 위한 커스텀 색상 스킴
5. **폰트**: Schibsted Grotesk (헤더), Source Sans Pro (본문), IBM Plex Mono (코드)

## 플러그인 설정

사이트는 다음 플러그인 체인을 사용합니다 (순서 중요):

**Transformers:**
- FrontMatter → CreatedModifiedDate → SyntaxHighlighting → ObsidianFlavoredMarkdown → GitHubFlavoredMarkdown → TableOfContents → CrawlLinks → Description → Latex

**Filters:**
- RemoveDrafts

**Emitters:**
- AliasRedirects → ComponentResources → ContentPage → FolderPage → TagPage → ContentIndex → Robots → Assets → Static → NotFoundPage

## Node/NPM 버전

- Node: v20.9.0 (`.node-version`에 명시)
- NPM: >=9.3.1 필요

## TypeScript 설정

- JSX 런타임: Preact (`jsxImportSource: "preact"`)
- 모듈 시스템: ESNext (node resolution)
- Strict 모드 활성화

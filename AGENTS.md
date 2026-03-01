# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-02
**Commit:** 56c1c95
**Branch:** v4

## OVERVIEW

Quartz v4 개인 블로그. Obsidian vault(심볼릭 링크 `content/`)의 Markdown을 정적 HTML로 변환하여 GitHub Pages(`khy07181.github.io`)에 배포.

## STRUCTURE

```
./
├── content/                  # Obsidian vault 심볼릭 링크 (직접 수정 금지)
├── quartz/                   # Quartz 프레임워크 코어 (AGENTS.md 참조)
│   ├── components/           # Preact 컴포넌트 (AGENTS.md 참조)
│   ├── plugins/              # transformer→filter→emitter 파이프라인 (AGENTS.md 참조)
│   ├── util/                 # 유틸리티 (path, theme, perf, glob 등)
│   ├── processors/           # parse.ts, filter.ts, emit.ts
│   ├── cli/                  # CLI 핸들러 (handlers.js, args.js)
│   ├── i18n/                 # 다국어 로케일 (26개 언어)
│   ├── static/               # robots.txt, giscus 테마 등 정적 파일
│   ├── styles/               # 글로벌 SCSS (base.scss, custom.scss 등)
│   ├── build.ts              # 빌드 오케스트레이션
│   ├── cfg.ts                # GlobalConfiguration, QuartzConfig 타입 정의
│   ├── depgraph.ts           # 의존성 그래프 (증분 빌드용)
│   └── bootstrap-cli.mjs     # CLI 진입점 (yargs)
├── quartz.config.ts          # 사이트 설정 (테마, 플러그인, 분석)
├── quartz.layout.ts          # 페이지 레이아웃 (컴포넌트 배치)
├── docs/                     # Quartz 문서 사이트 (이 블로그와 무관)
└── public/                   # 빌드 결과물 (git 추적 안함)
```

## WHERE TO LOOK

| Task                 | Location                                                       | Notes                                      |
| -------------------- | -------------------------------------------------------------- | ------------------------------------------ |
| 사이트 설정 변경     | `quartz.config.ts`                                             | 제목, 테마 색상, 폰트, 분석, 플러그인 체인 |
| 레이아웃 변경        | `quartz.layout.ts`                                             | 컴포넌트 배치, giscus 댓글 설정            |
| 커스텀 컴포넌트 수정 | `quartz/components/RecnetNotesForIndex.tsx`, `SocialIcons.tsx` | 이 블로그 전용 커스텀 컴포넌트             |
| 플러그인 추가/수정   | `quartz/plugins/`                                              | transformer, filter, emitter 디렉토리별    |
| 빌드 문제 디버깅     | `quartz/build.ts`                                              | 파일 워칭, 증분 빌드 로직                  |
| 배포 설정            | `.github/workflows/deploy.yml`                                 | v4 브랜치 push 시 자동 배포                |
| 스타일 수정          | `quartz/components/styles/`, `quartz/styles/`                  | 컴포넌트별 SCSS, 글로벌 스타일             |
| 콘텐츠 제외 패턴     | `quartz.config.ts` → `ignorePatterns`                          | 현재: private, templates, .obsidian        |

## CONVENTIONS

- **No semicolons**, 2-space indent, 100-char line width (`.prettierrc`)
- TypeScript strict mode + Preact JSX (`jsxImportSource: "preact"`)
- ESModule (`"type": "module"` in package.json)
- 컴포넌트는 `QuartzComponent` 또는 `QuartzComponentConstructor<Options>` 타입
- 플러그인은 `QuartzTransformerPlugin`, `QuartzFilterPlugin`, `QuartzEmitterPlugin` 타입
- CSS는 SCSS로 작성, 컴포넌트의 `.css` 프로퍼티에 할당
- 클라이언트 JS는 `.beforeDOMLoaded` (critical) 또는 `.afterDOMLoaded` (non-critical)

## ANTI-PATTERNS

- `content/` 디렉토리 직접 수정 금지 → Obsidian vault 심볼릭 링크
- `docs/` 디렉토리는 Quartz 공식 문서용 → 이 블로그 코드와 무관
- 플러그인 체인 순서 변경 시 빌드 깨질 수 있음 → `quartz.config.ts`의 순서 유지
- `public/` 디렉토리 수동 수정 금지 → 빌드 시 덮어씀
- `RecnetNotesForIndex.tsx` 파일명의 "Recnet" 오타는 의도적 유지 (import 참조 다수)

## CUSTOM MODIFICATIONS (vs Default Quartz v4)

| What                | File                                 | Description                          |
| ------------------- | ------------------------------------ | ------------------------------------ |
| 인덱스 전용 최근 글 | `RecnetNotesForIndex.tsx`            | index 페이지에서만 최근 10개 글 표시 |
| 소셜 아이콘         | `SocialIcons.tsx`                    | RSS, Email, GitHub 링크 (하드코딩)   |
| Robots emitter      | `plugins/emitters/robots.ts`         | robots.txt를 출력 루트에 복사        |
| giscus 댓글         | `quartz.layout.ts`                   | GitHub Discussions 기반 댓글         |
| Google Analytics    | `quartz.config.ts`                   | G-5LV1MFRSYJ                         |
| Explorer 정렬       | `components/Explorer.tsx`            | 날짜순 DESC 정렬, tags 폴더 제외     |
| RecentNotes 스타일  | `components/styles/recentNotes.scss` | 구분선, 태그/날짜 레이아웃 개선      |
| Date 컴포넌트       | `components/Date.tsx`                | HTML5 `<time>` 시맨틱 마크업         |
| Head 컴포넌트       | `components/Head.tsx`                | Google Site Verification 메타 태그   |
| sitemap 포맷팅      | `deploy.yml`                         | xmllint로 sitemap.xml 정리           |

## COMMANDS

```bash
npx quartz build              # 사이트 빌드 → public/
npx quartz build --serve      # 라이브 리로드 개발 서버 (포트 8080)
npx quartz sync               # 빌드 + GitHub Pages 배포
npm run check                 # 타입 체크 + Prettier 검증
npm run format                # 코드 포맷팅
npm run test                  # path.test.ts + depgraph.test.ts 실행
npm run profile               # 0x 성능 프로파일링
```

## NOTES

- Node v20.9.0 (`.node-version`), NPM >=9.3.1
- `content/` → Obsidian iCloud vault 심볼릭 링크 (로컬 환경 의존)
- `postquartz` npm hook: robots.txt 복사 + `.nojekyll` 생성
- 배포 워크플로우: v4 브랜치 push → `deploy.yml` → GitHub Pages
- 빌드 파이프라인: Markdown → mdast → hast → JSX → 정적 HTML (unified/remark/rehype)
- 128개 이상 콘텐츠 파일 시 워커 스레드로 병렬 파싱
- `docs/` 디렉토리에 4개 워크플로우 있지만, `ci.yaml`과 `docker-build-push.yaml`은 `jackyzha0/quartz` 레포 전용

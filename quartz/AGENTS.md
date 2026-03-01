# QUARTZ CORE

## OVERVIEW

Quartz 프레임워크 코어. CLI → 빌드 오케스트레이션 → 플러그인 파이프라인 → 정적 HTML 출력.

## EXECUTION FLOW

```
bootstrap-cli.mjs (yargs)
  → cli/handlers.js (handleBuild)
    → build.ts (buildQuartz)
      ├─ processors/parse.ts   # Markdown 파싱 (128+ 파일 시 워커 스레드)
      ├─ processors/filter.ts  # 콘텐츠 필터링 (draft 제외)
      └─ processors/emit.ts   # HTML/RSS/sitemap 생성
```

## KEY TYPES

| Type                  | File          | Description                                                        |
| --------------------- | ------------- | ------------------------------------------------------------------ |
| `GlobalConfiguration` | `cfg.ts`      | 사이트 전역 설정 (제목, 테마, 분석 등)                             |
| `QuartzConfig`        | `cfg.ts`      | configuration + plugins 통합 타입                                  |
| `FullPageLayout`      | `cfg.ts`      | head, header, beforeBody, pageBody, afterBody, left, right, footer |
| `PageLayout`          | `cfg.ts`      | beforeBody, left, right (콘텐츠/리스트 페이지용)                   |
| `SharedLayout`        | `cfg.ts`      | head, header, footer, afterBody (전체 공유)                        |
| `BuildCtx`            | `util/ctx.ts` | 빌드 컨텍스트 (config, argv, allSlugs)                             |
| `DepGraph<T>`         | `depgraph.ts` | 증분 빌드용 의존성 그래프                                          |

## WHERE TO LOOK

| Task             | Location                                             |
| ---------------- | ---------------------------------------------------- |
| 빌드 로직 수정   | `build.ts` — 파일 워칭, 증분 빌드, 에러 핸들링       |
| CLI 명령어 추가  | `cli/handlers.js` + `cli/args.js`                    |
| 경로/슬러그 유틸 | `util/path.ts` — FilePath, FullSlug, SimpleSlug 변환 |
| 성능 측정        | `util/perf.ts` — PerfTimer                           |
| 글로벌 스타일    | `styles/` — base.scss, custom.scss, variables.scss   |
| 빌드 캐시        | `.quartz-cache/` — 트랜스파일된 워커/빌드 결과물     |
| 정적 파일        | `static/` — robots.txt, giscus 테마 CSS              |

## BUILD PIPELINE DETAIL

1. **esbuild 트랜스파일**: TS/SCSS → JS/CSS (sass 플러그인 사용)
2. **콘텐츠 글로빙**: `content/` 내 모든 `.md` 파일 수집
3. **Markdown 파싱**: unified/remark로 mdast 생성 (워커 스레드 병렬 처리)
4. **Transformer 적용**: mdast/hast 변환 (플러그인 체인 순서대로)
5. **Filter 적용**: draft 등 불필요한 콘텐츠 제외
6. **Emitter 적용**: hast → JSX → `preact-render-to-string` → 정적 HTML
7. **CSS 최소화**: Lightning CSS로 번들 최소화
8. **출력**: `public/` 디렉토리에 결과물 작성

## NOTES

- `--serve` 모드: chokidar 파일 워칭 + WebSocket 라이브 리로드
- `--bundleInfo`: 번들 크기 정보 출력 (CI에서 사용)
- `--concurrency=1`: 프로파일링 시 단일 스레드 실행 (0x 호환)
- `bootstrap-worker.mjs`: `.quartz-cache/transpiled-worker.mjs`에서 워커 로드
- 빌드 실패 시 `util/trace.ts`로 에러 추적, `util/sourcemap.ts`로 소스맵 지원

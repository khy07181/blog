# PLUGINS

## OVERVIEW

transformer → filter → emitter 3단계 파이프라인. 14 transformers, 2 filters, 11 emitters. 순서가 중요함.

## PLUGIN TYPES

```typescript
// Transformer: Markdown/HTML AST 변환
QuartzTransformerPlugin<Options> = (opts?) => {
  name: string
  textTransform?: (ctx, src) => string | Buffer      // 원본 텍스트 변환
  markdownPlugins?: (ctx) => PluggableList            // remark 플러그인 체인
  htmlPlugins?: (ctx) => PluggableList                // rehype 플러그인 체인
  externalResources?: (ctx) => Partial<StaticResources> // 외부 CSS/JS
}

// Filter: 콘텐츠 포함/제외 결정
QuartzFilterPlugin<Options> = (opts?) => {
  name: string
  shouldPublish(ctx, content): boolean
}

// Emitter: 최종 파일 출력
QuartzEmitterPlugin<Options> = (opts?) => {
  name: string
  emit(ctx, content, resources): Promise<FilePath[]>
  getQuartzComponents(ctx): QuartzComponent[]
  getDependencyGraph?(ctx, content, resources): Promise<DepGraph<FilePath>>
}
```

## ACTIVE PLUGIN CHAIN (`quartz.config.ts`)

### Transformers (순서 변경 시 빌드 깨질 수 있음)

1. `FrontMatter()` — YAML frontmatter 파싱
2. `CreatedModifiedDate({ priority: ["frontmatter", "filesystem"] })` — 날짜 추출
3. `SyntaxHighlighting({ theme: { light: "github-light", dark: "github-dark" }, keepBackground: false })` — Shiki 구문 강조
4. `ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false })` — wikilink, callout 등
5. `GitHubFlavoredMarkdown()` — 테이블, 취소선 등
6. `TableOfContents()` — 목차 생성
7. `CrawlLinks({ markdownLinkResolution: "shortest" })` — 내부 링크 해석
8. `Description()` — 페이지 설명 추출
9. `Latex({ renderEngine: "katex" })` — 수학 수식 렌더링

### Filters

1. `RemoveDrafts()` — `draft: true` frontmatter 파일 제외

### Emitters

1. `AliasRedirects()` — alias 기반 리디렉트 페이지
2. `ComponentResources()` — 컴포넌트 CSS/JS 번들
3. `ContentPage()` — 개별 콘텐츠 HTML 페이지
4. `FolderPage()` — 폴더 목록 페이지
5. `TagPage()` — 태그 페이지
6. `ContentIndex({ enableSiteMap: true, enableRSS: true, includeEmptyFiles: false })` — 검색 인덱스, RSS, sitemap
7. `Robots()` — **커스텀**: robots.txt를 출력 루트에 복사
8. `Assets()` — 정적 에셋 복사
9. `Static()` — quartz/static/ 파일 복사
10. `NotFoundPage()` — 404 페이지

## CUSTOM PLUGIN

**Robots** (`emitters/robots.ts`): `quartz/static/robots.txt`를 출력 디렉토리 루트에 복사. `getDependencyGraph` 포함 (증분 빌드 지원).

## ADDING A NEW PLUGIN

1. 해당 타입 디렉토리에 파일 생성 (`transformers/`, `filters/`, `emitters/`)
2. 위 타입 인터페이스 구현
3. 해당 `index.ts`에 export 추가
4. `quartz.config.ts`의 플러그인 체인에 등록 (순서 주의)

## SUBDIRECTORY MAP

| Dir             | Files | Notes                                                          |
| --------------- | ----- | -------------------------------------------------------------- |
| `transformers/` | 14    | OFM, GFM, LaTeX, Shiki 등. 대부분 remark/rehype 플러그인 래퍼. |
| `filters/`      | 3     | draft.ts (사용 중), explicit.ts (미사용)                       |
| `emitters/`     | 11    | HTML 페이지, RSS, sitemap, 에셋 복사 등                        |

## SUPPORT FILES

| File       | Purpose                                                                          |
| ---------- | -------------------------------------------------------------------------------- |
| `types.ts` | 플러그인 타입 정의 (`PluginTypes`, 각 Plugin/Instance 타입)                      |
| `vfile.ts` | `QuartzPluginData` 타입 — frontmatter, slug, dates 등 파일 메타데이터            |
| `index.ts` | `getStaticResourcesFromPlugins()` + 모든 플러그인 re-export + vfile DataMap 확장 |

## ANTI-PATTERNS

- 플러그인 체인 순서 임의 변경 금지 — 특히 FrontMatter는 반드시 첫 번째
- `explicit.ts` 필터는 현재 미사용 — RemoveDrafts만 활성
- Emitter에서 `getQuartzComponents()` 빼먹으면 해당 컴포넌트의 CSS/JS 번들 안 됨

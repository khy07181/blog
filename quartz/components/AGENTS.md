# COMPONENTS

## OVERVIEW

Preact 기반 UI 컴포넌트. 정적 HTML로 렌더링됨 (CSR 아님). 26개 컴포넌트 + 16 SCSS + 13 클라이언트 스크립트.

## COMPONENT PATTERN

```typescript
// 옵션 없는 컴포넌트
const MyComponent: QuartzComponent = (props: QuartzComponentProps) => {
  return <div>{/* JSX */}</div>
}
MyComponent.css = style           // SCSS import
MyComponent.afterDOMLoaded = script // 클라이언트 JS (선택)
export default MyComponent

// 옵션 있는 컴포넌트 (QuartzComponentConstructor 패턴)
export default ((opts?: Options) => {
  const Component: QuartzComponent = (props) => { /* ... */ }
  Component.css = style
  return Component
}) satisfies QuartzComponentConstructor<Options>
```

**Props** (`QuartzComponentProps`):

- `ctx`: BuildCtx (빌드 컨텍스트)
- `fileData`: QuartzPluginData (현재 파일 메타데이터)
- `cfg`: GlobalConfiguration
- `allFiles`: QuartzPluginData[] (전체 파일 목록)
- `tree`: hast Node
- `displayClass`: `"mobile-only"` | `"desktop-only"`

## CUSTOM COMPONENTS (이 블로그 전용)

| Component           | File                      | Purpose                                                 |
| ------------------- | ------------------------- | ------------------------------------------------------- |
| RecnetNotesForIndex | `RecnetNotesForIndex.tsx` | index 페이지에서만 최근 10개 글 표시. RecentNotes 래핑. |
| SocialIcons         | `SocialIcons.tsx`         | RSS, Email, GitHub 링크. 하드코딩된 URL + inline SVG.   |

## MODIFIED COMPONENTS (Default Quartz에서 변경)

| Component   | File              | Changes                                                    |
| ----------- | ----------------- | ---------------------------------------------------------- |
| Explorer    | `Explorer.tsx`    | 날짜순 DESC 정렬, tags 폴더 제외, `useSavedState: false`   |
| RecentNotes | `RecentNotes.tsx` | 스타일만 변경 (`recentNotes.scss`에 구분선, 태그 레이아웃) |
| Date        | `Date.tsx`        | HTML5 `<time>` 시맨틱 마크업                               |
| Head        | `Head.tsx`        | Google Site Verification 메타 태그 추가                    |

## LAYOUT INTEGRATION (`quartz.layout.ts`)

```
Shared (모든 페이지):
  head: Head
  afterBody: Comments (giscus)
  footer: Footer

Content Page:
  beforeBody: Breadcrumbs → ArticleTitle → ContentMeta → TagList → RecnetNotesForIndex
  left:       PageTitle → SocialIcons → Spacer(mobile) → Search → Darkmode → Explorer
  right:      Graph → TableOfContents(desktop) → Backlinks

List Page:
  beforeBody: Breadcrumbs → ArticleTitle → ContentMeta
  left:       (Content Page와 동일)
  right:      (비어 있음)
```

## SUBDIRECTORY MAP

| Dir        | Contents                                | Notes                                            |
| ---------- | --------------------------------------- | ------------------------------------------------ |
| `styles/`  | 16 SCSS 파일                            | 컴포넌트별 스타일. `social-icons.scss`만 커스텀. |
| `scripts/` | 13 `*.inline.ts` 파일                   | 클라이언트 JS. `explorer.inline.ts`만 커스텀.    |
| `pages/`   | Content, TagContent, FolderContent, 404 | 페이지 레벨 컴포넌트 (수정 없음)                 |

## ADDING A NEW COMPONENT

1. `quartz/components/MyComponent.tsx` 생성 (위 패턴 따르기)
2. 스타일 필요 시 `styles/myComponent.scss` 생성 후 import
3. 클라이언트 JS 필요 시 `scripts/myComponent.inline.ts` 생성
4. `index.ts`에 import + export 추가
5. `quartz.layout.ts`에서 원하는 위치에 배치

## ANTI-PATTERNS

- `RecnetNotesForIndex.tsx` 파일명 리네임 금지 — `quartz.layout.ts`에서 직접 import
- 컴포넌트에서 `index.ts`를 거치지 않고 직접 import하는 경우 있음 (RecnetNotesForIndex)
- `displayClass` prop 무시하면 반응형 레이아웃 깨짐
- CSS는 반드시 SCSS로 작성 → esbuild sass 플러그인이 처리

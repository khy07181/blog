# Explorer v4 → v5 local-plugin port

Local Quartz **v5** component plugin that faithfully reproduces the heavily-customized
v4 "tabbed explorer" from the live blog (`/Users/hayoung/dev/personal/blog`).

Plugin name: **`explorer`** (drops in as the explorer). Config source: `./plugins/explorer`.

## Feature parity (all ported)

- Two-tab sidebar: **연도 (year)** = folder tree, **태그 (tag)** = tag-category view.
- Default active tab = year, persisted in `localStorage["explorer-active-view"]`.
- Custom `sortFn`: folders name DESC (numeric → newest year first); files by
  `published ?? created ?? modified` DESC, alpha fallback.
- `filterFn`: excludes the top-level `tags` folder (`node.name !== "tags"`).
- `folderClickBehavior: "collapse"`, `folderDefaultState: "collapsed"`, `useSavedState: false`.
- Newest-year folder auto-expanded (server-rendered `open` class + `data-tree` state).
- Tag view: `buildTagCategoryData()` groups each note's tags by its frontmatter
  `category` (order: dev, productivity, knowledge-management, essay, writing, science,
  others; missing → others). Collapsible categories with tag pills + per-category counts,
  open-state persisted in `localStorage["tag-categories-open"]`.
- Active-file / active-tag `is-active` highlight on `nav`.
- The full ~116 lines of custom SCSS (tabs, tag-category, pills).

## The `new Date()` workaround (required by v5)

v4 read the wall clock in **two** places to expand the "current year" folder
(`Explorer.tsx` and `ExplorerNode.tsx`). Quartz v5 forbids `new Date()` / `Date.now()`
in build code (non-reproducible builds).

Replacement (deterministic, same visual result):

- `Explorer.tsx` → `computeExpandedYear(tree)` picks the **max numeric top-level folder
  name** (folders matching `/^\d+$/`) from the built tree — i.e. the newest year.
- That value is threaded down as the `expandedYear` prop to `ExplorerNode`, which sets
  the folder `open` class when `node.name === expandedYear` (replacing `isCurrentYear`).
- The same value flips `folder.collapsed = false` for the matching path in the
  serialized `data-tree` state consumed by the inline script.

Verified in the built site: content has `2025/` and `2026/` → **2026** renders `open`,
`2025` collapsed. No `new Date` / `Date.now` anywhere in `dist/`.

## v4 → v5 import mapping

| v4 | v5 |
|---|---|
| `./types` (QuartzComponent*, props) | `@quartz-community/types` |
| `../plugins/vfile` (QuartzPluginData) | `@quartz-community/types` |
| `../util/path` (joinSegments, resolveRelative, simplifySlug, slugTag, pathToRoot, SimpleSlug, FilePath) | `@quartz-community/utils/path` |
| `../util/lang` (classNames) | `@quartz-community/utils/lang` (via `src/util/lang.ts`) |
| `../i18n` | copied `src/i18n/` (from community explorer) — title only |
| `rfdc()` `clone` | local shallow `clone` (see below) |

## Deviations from v4 (minor, behavior-preserving)

- **`clone`**: v4 used `rfdc()` (deep clone) on each file. That dep isn't available in
  v5, and the default `mapFn` is identity (no mutation), so `ExplorerNode` uses a shallow
  copy `{ ...file }`. Behaviorally identical here, and avoids `structuredClone` throwing
  on the hast `htmlAst`.
- **Explorer title**: uses `i18n(cfg.locale).components.explorer.title` (en-US → "Explorer"),
  matching v4 which passed no title override. The tab labels 연도/태그 are hardcoded (as in v4).
- **`ctx.buildId`**: v5 `BuildCtx` has no `buildId`; the memoization guard is cast and
  still builds the tree once per component instance.
- **Inline script type import**: `import { FolderState }` → `import type { FolderState }`
  so the esbuild inline bundler drops it (otherwise it would pull the whole module in).
- **SCSS variables**: v4 `@use "../../styles/variables.scss"` isn't available to v5
  plugins, so values are inlined: `$mobile` → `(max-width: 800px)`, `$semiBoldWeight` → 600,
  `$topSpacing` → 6rem.

## Build

tsup is **not installed** in this repo, but `esbuild` and `sass` are (they are what tsup
uses internally). `build.mjs` reproduces the community explorer's tsup pipeline:

- `.scss` → compiled CSS string (text loader).
- `.inline.ts` → bundled + minified JS string (text loader), exports stripped.
- `preact` / `preact/jsx-runtime` are **external singletons** (never bundled);
  `@quartz-community/utils` is bundled in.
- Emits `dist/components/index.js` (the real component), a `dist/index.js` barrel, and
  hand-written `dist/index.d.ts` (community format so the loader's
  `parseExportsFromDts` / `isOverridableExport` register `Explorer`).

Run: `npm run build` (= `node build.mjs`). `dist/` is shipped pre-built, so
`npx quartz plugin install` uses it directly (`✓ explorer: using pre-built dist/`).

## Install notes

- `npx quartz plugin install` treats a plugin as "already installed" if a lockfile
  entry + dir exist, regardless of source. To switch explorer from the github source to
  this local one, the stale `.quartz/plugins/explorer` clone and its `quartz.lock.json`
  entry were removed, then `npx quartz plugin install --from-config` linked the local dir.
  After that, plain `npx quartz plugin install` keeps it (`explorer (local) already linked`).
- Side effect of `--from-config`: it pruned two lockfile orphans that were **not** in
  `quartz.config.yaml` (`quartz-themes`, `obsidian-plugin-excalidraw`). They were never
  loaded by the config anyway, so the build output is unchanged; re-add via config /
  `plugin add` if ever needed.

## File list

```
plugins/explorer/
  package.json            # quartz manifest: name "explorer", category component,
                          # components.Explorer (left/40), enableTagView option
  build.mjs               # esbuild + sass build (tsup replacement)
  tsconfig.json
  tsconfig.build.json
  types/globals.d.ts      # *.scss / *.inline.ts module decls
  node_modules/preact     # symlink → repo-root preact (external singleton)
  src/
    index.ts              # export { Explorer }
    util/lang.ts          # re-export classNames
    i18n/                 # title localization (from community explorer)
    components/
      index.ts            # export { Explorer }
      Explorer.tsx        # tabbed markup + defaultOptions + expandedYear workaround
      ExplorerNode.tsx    # FileNode tree, buildTagCategoryData, ExplorerNode recursion
      scripts/explorer.inline.ts   # tab/folder/tag-category JS + persistence
      styles/explorer.scss         # ~116 custom lines + folder/mobile styles
  dist/                   # pre-built ESM output (index.js, components/index.js, *.d.ts)
```

import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
  QuartzPluginData,
} from "@quartz-community/types"
import { pathToRoot } from "@quartz-community/utils/path"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import style from "./styles/explorer.scss"
// @ts-expect-error - Inline script loaded as text by the esbuild plugin
import script from "./scripts/explorer.inline.ts"
import {
  ExplorerNode,
  FileNode,
  type Options,
  type TagCategoryData,
  buildTagCategoryData,
} from "./ExplorerNode"

export type { Options as ExplorerOptions } from "./ExplorerNode"

// Options interface defined in `ExplorerNode` to avoid circular dependency
const defaultOptions = {
  folderClickBehavior: "collapse",
  folderDefaultState: "collapsed",
  useSavedState: false,
  enableTagView: false,
  mapFn: (node) => {
    return node
  },
  sortFn: (a, b) => {
    // Keep folders before files
    const aIsFolder = !a.file
    const bIsFolder = !b.file

    if (aIsFolder && bIsFolder) {
      // Folders: name DESC (reverse alphabetical). Use numeric collation.
      return b.displayName.localeCompare(a.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }

    if (!aIsFolder && !bIsFolder) {
      // Files: sort by date (published -> created -> modified) DESC, then title
      const getPrimaryDate = (n: typeof a) =>
        n.file?.dates?.published ?? n.file?.dates?.created ?? n.file?.dates?.modified

      const da = getPrimaryDate(a)
      const db = getPrimaryDate(b)

      if (da && db) {
        return db.getTime() - da.getTime()
      } else if (da && !db) {
        return -1
      } else if (!da && db) {
        return 1
      }

      // Fallback alphabetical by display name if no dates
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }

    // Mixed: folders before files
    return aIsFolder ? -1 : 1
  },
  // Hide the "tags" index folder and the generated "404" error page. The 404 page
  // is a virtual page (see quartz/plugins/pageTypes/404.ts) that the dispatcher keeps
  // out of ctx.virtualPages, but it still reaches this component via allFiles, so it
  // would otherwise appear as a "Not Found" entry in the sidebar tree.
  filterFn: (node) => node.name !== "tags" && node.name !== "404",
  order: ["filter", "map", "sort"],
} satisfies Options

export default ((userOpts?: Partial<Options>) => {
  // Parse config
  const opts: Options = { ...defaultOptions, ...userOpts }

  // memoized
  let fileTree: FileNode
  let jsonTree: string
  let tagCategories: TagCategoryData[]
  // Reproducible replacement for v4's `new Date().getFullYear()`: newest year folder.
  let expandedYear: string | undefined
  let lastBuildId: string | undefined = ""

  // Compute the newest (max) top-level numeric ("year-like") folder name. This is
  // deterministic (derived from the built tree) and replaces v4's build-time
  // `new Date().getFullYear()`, which Quartz v5 forbids for reproducible builds.
  function computeExpandedYear(tree: FileNode): string | undefined {
    const yearFolders = tree.children
      .filter((c) => !c.file && /^\d+$/.test(c.name))
      .map((c) => c.name)
    if (yearFolders.length === 0) return undefined
    return yearFolders.sort((a, b) =>
      b.localeCompare(a, undefined, { numeric: true, sensitivity: "base" }),
    )[0]
  }

  function constructFileTree(allFiles: QuartzPluginData[]) {
    // Construct tree from allFiles
    fileTree = new FileNode("")
    allFiles.forEach((file) => fileTree.add(file))

    // Execute all functions (sort, filter, map) that were provided (if none were provided, only default "sort" is applied)
    if (opts.order) {
      // Order is important, use loop with index instead of order.map()
      for (let i = 0; i < opts.order.length; i++) {
        const functionName = opts.order[i]
        if (functionName === "map") {
          fileTree.map(opts.mapFn)
        } else if (functionName === "sort") {
          fileTree.sort(opts.sortFn)
        } else if (functionName === "filter") {
          fileTree.filter(opts.filterFn)
        }
      }
    }

    // Newest year folder (reproducible; see computeExpandedYear)
    expandedYear = computeExpandedYear(fileTree)

    // Build initial folder states: collapse all, then open only the newest year folder
    // Stringify to pass json tree as data attribute ([data-tree])
    const folders = fileTree.getFolderPaths(opts.folderDefaultState === "collapsed")
    // Always expand the newest year folder
    for (const folder of folders) {
      if (folder.path === expandedYear) {
        folder.collapsed = false
      }
    }
    jsonTree = JSON.stringify(folders)

    // Build tag category data if enabled
    if (opts.enableTagView) {
      tagCategories = buildTagCategoryData(allFiles)
    }
  }

  const Explorer: QuartzComponent = ({
    ctx,
    cfg,
    allFiles,
    displayClass,
    fileData,
  }: QuartzComponentProps) => {
    const buildId = (ctx as { buildId?: string } | undefined)?.buildId
    if (buildId !== lastBuildId) {
      lastBuildId = buildId
      constructFileTree(allFiles)
    }

    const baseDir = pathToRoot(fileData.slug!)

    return (
      <div class={classNames(displayClass, "explorer")}>
        <button
          type="button"
          id="mobile-explorer"
          class="collapsed hide-until-loaded"
          data-behavior={opts.folderClickBehavior}
          data-collapsed={opts.folderDefaultState}
          data-savestate={opts.useSavedState}
          data-tree={jsonTree}
          data-mobile={true}
          aria-controls="explorer-content"
          aria-expanded={false}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
        <button
          type="button"
          id="desktop-explorer"
          class="title-button"
          data-behavior={opts.folderClickBehavior}
          data-collapsed={opts.folderDefaultState}
          data-savestate={opts.useSavedState}
          data-tree={jsonTree}
          data-mobile={false}
          aria-controls="explorer-content"
          aria-expanded={true}
        >
          <h2>{opts.title ?? i18n(cfg.locale).components.explorer.title}</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="5 8 14 8"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="fold"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div id="explorer-content">
          {opts.enableTagView && (
            <div class="explorer-tabs">
              <button class="explorer-tab active" data-view="year">
                연도
              </button>
              <button class="explorer-tab" data-view="tag">
                태그
              </button>
            </div>
          )}
          <div data-explorer-view="year">
            <ul class="overflow" id="explorer-ul">
              <ExplorerNode
                node={fileTree}
                opts={opts}
                fileData={fileData}
                expandedYear={expandedYear}
              />
              <li id="explorer-end" />
            </ul>
          </div>
          {opts.enableTagView && (
            <div data-explorer-view="tag" style="display:none">
              <div class="tag-explorer">
                {tagCategories.map((cat) => (
                  <div class="tag-category">
                    <button class="tag-category-header" type="button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="5 8 14 8"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="tag-category-icon"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                      <span>{cat.category}</span>
                    </button>
                    <div class="tag-category-body">
                      <ul class="tag-pill-list">
                        {cat.tags.map((t) => (
                          <li>
                            <a href={`${baseDir}/tags/${t.slug}`} class="internal tag-link">
                              {t.name}
                              <span class="tag-count">{t.count}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  Explorer.css = style
  Explorer.afterDOMLoaded = script
  return Explorer
}) satisfies QuartzComponentConstructor

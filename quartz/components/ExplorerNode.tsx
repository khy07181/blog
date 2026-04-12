// @ts-ignore
import { QuartzPluginData } from "../plugins/vfile"
import {
  joinSegments,
  resolveRelative,
  clone,
  simplifySlug,
  slugTag,
  SimpleSlug,
  FilePath,
} from "../util/path"

type OrderEntries = "sort" | "filter" | "map"

export interface Options {
  title?: string
  folderDefaultState: "collapsed" | "open"
  folderClickBehavior: "collapse" | "link"
  useSavedState: boolean
  sortFn: (a: FileNode, b: FileNode) => number
  filterFn: (node: FileNode) => boolean
  mapFn: (node: FileNode) => void
  order: OrderEntries[]
  enableTagView?: boolean
}

export type TagInfo = {
  name: string
  slug: string
  count: number
}

export type TagCategoryData = {
  category: string
  tags: TagInfo[]
}

type DataWrapper = {
  file: QuartzPluginData
  path: string[]
}

export type FolderState = {
  path: string
  collapsed: boolean
}

function getPathSegment(fp: FilePath | undefined, idx: number): string | undefined {
  if (!fp) {
    return undefined
  }

  return fp.split("/").at(idx)
}

// Structure to add all files into a tree
export class FileNode {
  children: Array<FileNode>
  name: string // this is the slug segment
  displayName: string
  file: QuartzPluginData | null
  depth: number

  constructor(slugSegment: string, displayName?: string, file?: QuartzPluginData, depth?: number) {
    this.children = []
    this.name = slugSegment
    this.displayName = displayName ?? file?.frontmatter?.title ?? slugSegment
    this.file = file ? clone(file) : null
    this.depth = depth ?? 0
  }

  private insert(fileData: DataWrapper) {
    if (fileData.path.length === 0) {
      return
    }

    const nextSegment = fileData.path[0]

    // base case, insert here
    if (fileData.path.length === 1) {
      if (nextSegment === "") {
        // index case (we are the root and we just found index.md), set our data appropriately
        const title = fileData.file.frontmatter?.title
        if (title && title !== "index") {
          this.displayName = title
        }
      } else {
        // direct child
        this.children.push(new FileNode(nextSegment, undefined, fileData.file, this.depth + 1))
      }

      return
    }

    // find the right child to insert into
    fileData.path = fileData.path.splice(1)
    const child = this.children.find((c) => c.name === nextSegment)
    if (child) {
      child.insert(fileData)
      return
    }

    const newChild = new FileNode(
      nextSegment,
      getPathSegment(fileData.file.relativePath, this.depth),
      undefined,
      this.depth + 1,
    )
    newChild.insert(fileData)
    this.children.push(newChild)
  }

  // Add new file to tree
  add(file: QuartzPluginData) {
    this.insert({ file: file, path: simplifySlug(file.slug!).split("/") })
  }

  /**
   * Filter FileNode tree. Behaves similar to `Array.prototype.filter()`, but modifies tree in place
   * @param filterFn function to filter tree with
   */
  filter(filterFn: (node: FileNode) => boolean) {
    this.children = this.children.filter(filterFn)
    this.children.forEach((child) => child.filter(filterFn))
  }

  /**
   * Filter FileNode tree. Behaves similar to `Array.prototype.map()`, but modifies tree in place
   * @param mapFn function to use for mapping over tree
   */
  map(mapFn: (node: FileNode) => void) {
    mapFn(this)
    this.children.forEach((child) => child.map(mapFn))
  }

  /**
   * Get folder representation with state of tree.
   * Intended to only be called on root node before changes to the tree are made
   * @param collapsed default state of folders (collapsed by default or not)
   * @returns array containing folder state for tree
   */
  getFolderPaths(collapsed: boolean): FolderState[] {
    const folderPaths: FolderState[] = []

    const traverse = (node: FileNode, currentPath: string) => {
      if (!node.file) {
        const folderPath = joinSegments(currentPath, node.name)
        if (folderPath !== "") {
          folderPaths.push({ path: folderPath, collapsed })
        }

        node.children.forEach((child) => traverse(child, folderPath))
      }
    }

    traverse(this, "")
    return folderPaths
  }

  // Sort order: folders first, then files. Sort folders and files alphabetically
  /**
   * Sorts tree according to sort/compare function
   * @param sortFn compare function used for `.sort()`, also used recursively for children
   */
  sort(sortFn: (a: FileNode, b: FileNode) => number) {
    this.children = this.children.sort(sortFn)
    this.children.forEach((e) => e.sort(sortFn))
  }
}

// Canonical category order for display
const CATEGORY_ORDER = [
  "dev",
  "productivity",
  "knowledge-management",
  "essay",
  "writing",
  "science",
  "others",
]

export function buildTagCategoryData(allFiles: QuartzPluginData[]): TagCategoryData[] {
  // Map: category -> (tag -> count)
  const categoryTagCounts = new Map<string, Map<string, number>>()

  for (const file of allFiles) {
    const tags = file.frontmatter?.tags ?? []
    if (tags.length === 0) continue
    const rawCategory = file.frontmatter?.category
    const categories: string[] = Array.isArray(rawCategory)
      ? rawCategory
      : rawCategory
        ? [rawCategory as string]
        : ["others"]

    for (const category of categories) {
      if (!categoryTagCounts.has(category)) {
        categoryTagCounts.set(category, new Map())
      }
      const tagCounts = categoryTagCounts.get(category)!
      for (const tag of tags) {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      }
    }
  }

  // Sort categories by canonical order, unknown categories appended at end
  const sortedCategories = [...categoryTagCounts.keys()].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a)
    const bi = CATEGORY_ORDER.indexOf(b)
    if (ai === -1 && bi === -1) return a.localeCompare(b)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })

  return sortedCategories.map((category) => {
    const tagCounts = categoryTagCounts.get(category)!
    const tags: TagInfo[] = [...tagCounts.entries()]
      .map(([name, count]) => ({ name, slug: slugTag(name), count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    return { category, tags }
  })
}

type ExplorerNodeProps = {
  node: FileNode
  opts: Options
  fileData: QuartzPluginData
  fullPath?: string
}

export function ExplorerNode({ node, opts, fullPath, fileData }: ExplorerNodeProps) {
  // Get options
  const folderBehavior = opts.folderClickBehavior
  const isDefaultOpen = opts.folderDefaultState === "open"
  const isCurrentYear = node.name === new Date().getFullYear().toString()

  // Calculate current folderPath
  const folderPath = node.name !== "" ? joinSegments(fullPath ?? "", node.name) : ""
  const href = resolveRelative(fileData.slug!, folderPath as SimpleSlug) + "/"

  return (
    <>
      {node.file ? (
        // Single file node
        <li key={node.file.slug}>
          <a href={resolveRelative(fileData.slug!, node.file.slug!)} data-for={node.file.slug}>
            {node.displayName}
          </a>
        </li>
      ) : (
        <li>
          {node.name !== "" && (
            // Node with entire folder
            // Render svg button + folder name, then children
            <div class="folder-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="5 8 14 8"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="folder-icon"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              {/* render <a> tag if folderBehavior is "link", otherwise render <button> with collapse click event */}
              <div key={node.name} data-folderpath={folderPath}>
                {folderBehavior === "link" ? (
                  <a href={href} data-for={node.name} class="folder-title">
                    {node.displayName}
                  </a>
                ) : (
                  <button class="folder-button">
                    <span class="folder-title">{node.displayName}</span>
                  </button>
                )}
              </div>
            </div>
          )}
          {/* Recursively render children of folder */}
          <div class={`folder-outer ${node.depth === 0 || isDefaultOpen || isCurrentYear ? "open" : ""}`}>
            <ul
              // Inline style for left folder paddings
              style={{
                paddingLeft: node.name !== "" ? "1.4rem" : "0",
              }}
              class="content"
              data-folderul={folderPath}
            >
              {node.children.map((childNode, i) => (
                <ExplorerNode
                  node={childNode}
                  key={i}
                  opts={opts}
                  fullPath={folderPath}
                  fileData={fileData}
                />
              ))}
            </ul>
          </div>
        </li>
      )}
    </>
  )
}

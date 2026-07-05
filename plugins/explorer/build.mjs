// Build script for the local "explorer" Quartz v5 component plugin.
//
// tsup is not installed in this repo, but esbuild and sass are (they are what tsup
// uses under the hood). This script reproduces the community explorer's tsup build:
//   - .scss  -> compiled to a CSS string (text loader)
//   - .inline.ts -> bundled+minified to a JS string (text loader)
//   - preact / preact/jsx-runtime are EXTERNAL singletons (never bundled)
//
// Output (ESM):
//   dist/components/index.js   (the real component, used for rendering)
//   dist/index.js              (barrel re-export, imported for side effects)
//   dist/index.d.ts            (parsed by the Quartz plugin loader to register Explorer)
//   dist/components/index.d.ts

import { build } from "esbuild"
import * as sass from "sass"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, "dist")

const SINGLETON_EXTERNALS = ["preact", "preact/hooks", "preact/jsx-runtime", "preact/compat"]

/** esbuild plugin: load .scss as compiled CSS text, .inline.ts as bundled JS text. */
const inlineAndScssPlugin = {
  name: "inline-and-scss-loader",
  setup(parentBuild) {
    parentBuild.onLoad({ filter: /\.scss$/ }, async (args) => {
      const result = sass.compile(args.path)
      return { contents: result.css, loader: "text" }
    })

    parentBuild.onLoad({ filter: /\.inline\.ts$/ }, async (args) => {
      let text = await fs.promises.readFile(args.path, "utf8")
      text = text.replace(/^export default /gm, "")
      text = text.replace(/^export /gm, "")

      const resolveDir = path.dirname(args.path)
      const sourcefile = path.relative(__dirname, args.path)

      const result = await build({
        stdin: { contents: text, loader: "ts", resolveDir, sourcefile },
        write: false,
        bundle: true,
        minify: true,
        platform: "browser",
        format: "esm",
        target: "es2020",
        sourcemap: false,
        external: ["http://*", "https://*"],
      })

      const js = result.outputFiles?.[0]?.text
      if (!js) throw new Error(`inline-script-loader: no JS output for ${args.path}`)
      return { contents: js, loader: "text" }
    })
  },
}

async function main() {
  fs.rmSync(distDir, { recursive: true, force: true })

  // Build the real component bundle. Only components/index is bundled to avoid
  // duplicating the whole module into dist/index.js.
  await build({
    entryPoints: { "components/index": "src/components/index.ts" },
    outdir: "dist",
    bundle: true,
    format: "esm",
    platform: "node",
    target: "es2022",
    splitting: false,
    sourcemap: false,
    treeShaking: true,
    external: SINGLETON_EXTERNALS,
    jsx: "automatic",
    jsxImportSource: "preact",
    plugins: [inlineAndScssPlugin],
    logLevel: "info",
  })

  // Barrel entry: re-export from the built component bundle (side-effect import target).
  fs.writeFileSync(
    path.join(distDir, "index.js"),
    `export { Explorer } from "./components/index.js";\n`,
  )

  // Type declarations. dist/index.d.ts is parsed by the Quartz plugin loader
  // (parseExportsFromDts / isOverridableExport) to register the Explorer component,
  // so it must expose `_default as Explorer` with a `(...) => QuartzComponent` type.
  const indexDts = `import { QuartzComponent } from '@quartz-community/types';

interface FileNode {
  file: unknown;
  displayName: string;
}
export interface ExplorerOptions {
  title?: string;
  folderDefaultState: "collapsed" | "open";
  folderClickBehavior: "collapse" | "link";
  useSavedState: boolean;
  sortFn: (a: FileNode, b: FileNode) => number;
  filterFn: (node: FileNode) => boolean;
  mapFn: (node: FileNode) => void;
  order: Array<"sort" | "filter" | "map">;
  enableTagView?: boolean;
}
declare const _default: (userOpts?: Partial<ExplorerOptions>) => QuartzComponent;
export { _default as Explorer, type ExplorerOptions };
`
  fs.writeFileSync(path.join(distDir, "index.d.ts"), indexDts)
  fs.writeFileSync(
    path.join(distDir, "components", "index.d.ts"),
    `export { Explorer, ExplorerOptions } from '../index.js';\n`,
  )

  console.log("explorer plugin: build complete ->", distDir)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

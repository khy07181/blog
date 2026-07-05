import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { registerCondition } from "./quartz/plugins/loader/conditions"
import { componentRegistry } from "./quartz/components/registry"

// v4 RecnetNotesForIndex showed recent posts only on the index page.
// Register an "index" layout condition to replicate that (builtin only ships "not-index").
registerCondition("index", (props) => props.fileData.slug === "index")

// v4 RecnetNotesForIndex filtered out the landing page ("hayoung blog", slug "index").
// Inject the JS filter (functions can't live in quartz.config.yaml) via the option-override registry.
componentRegistry.setOptionOverrides("recent-notes", {
  filter: (f: { slug?: string; unlisted?: boolean }) => {
    const slug = String(f.slug ?? "")
    return slug !== "index" && slug !== "tags" && !slug.startsWith("tags/") && f.unlisted !== true
  },
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()

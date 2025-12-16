import { FilePath, QUARTZ, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import fs from "fs"
import DepGraph from "../../depgraph"

// Copies quartz/static/robots.txt to the site root as /robots.txt
export const Robots: QuartzEmitterPlugin = () => ({
  name: "Robots",
  getQuartzComponents() {
    return []
  },
  async getDependencyGraph({ argv }, _content, _resources) {
    const graph = new DepGraph<FilePath>()
    const src = joinSegments(QUARTZ, "static", "robots.txt")
    const dest = joinSegments(argv.output, "robots.txt")
    graph.addEdge(src as FilePath, dest as FilePath)
    return graph
  },
  async emit({ argv }, _content, _resources) {
    const src = joinSegments(QUARTZ, "static", "robots.txt")
    const dest = joinSegments(argv.output, "robots.txt")
    try {
      await fs.promises.copyFile(src, dest)
    } catch (e) {
      // ignore if missing; user may not provide robots.txt
    }
    return [dest as FilePath]
  },
})

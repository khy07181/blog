// Local Quartz v5 transformer plugin: injects custom <head> meta tags.
// Ported from v4 quartz/components/Head.tsx (google-site-verification).
// Hand-authored compiled output (no build step); preact is an external singleton.
import { h } from "preact";

var HeadMeta = () => ({
  name: "HeadMeta",
  // no-op markdown plugin so the loader recognizes this as a transformer
  markdownPlugins() {
    return [];
  },
  externalResources() {
    return {
      additionalHead: [
        h("meta", {
          name: "google-site-verification",
          content: "J7M_TUQSjWBrqZt2V9LjuqwJzG5K17jb93vmWqmE2tM",
        }),
      ],
    };
  },
});

export default HeadMeta;

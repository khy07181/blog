import { QuartzComponent } from '@quartz-community/types';

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

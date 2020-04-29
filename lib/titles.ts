import visit from "unist-util-visit";
import is from "unist-util-is";
import unist from "unist";
import { VFile } from "vfile";
import { Transformer } from "unified";

export function titles(): Transformer {
  function titleTransformer(tree: unist.Parent, file: VFile) {
    let title = "";

    visit(tree, "heading", headingVisitor);

    function headingVisitor(node: unist.Parent) {
      if (node.depth === 1 && node.children.length === 1) {
        const child = node.children[0];
        if (!is(child, "text")) {
          return;
        }
        title = child["value"] as string;
      }
    }

    file.data["title"] = title;
  }

  return titleTransformer;
}

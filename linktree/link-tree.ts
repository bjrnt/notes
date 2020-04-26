import util from "util";
import unified from "unified";
import markdown from "remark-parse";
import visit from "unist-util-visit";
import vfile from "to-vfile";

const rawDoc = vfile.readSync("./posts/meme.md");
const parser = unified().use(markdown);
const processor = unified().use(attacher);

const ast = parser.parse(rawDoc);
processor.runSync(ast, rawDoc);

console.log(util.inspect(ast, false, 500));

console.log(rawDoc.data.localMarkdownLinks);

function isLocalMarkdownLink(url: string): boolean {
  return url.match(/^\.\/.+\.md$/) != null;
}

function attacher() {
  function transformer(tree, file) {
    const localMdLinks = new Set();

    const referencedIdentifiers = new Set();

    visit(tree, "link", linkVisitor);
    visit(tree, "linkReference", linkReferenceVisitor);
    visit(tree, "definition", definitionVisitor);

    function linkVisitor(node) {
      if (node.url && isLocalMarkdownLink(node.url)) {
        localMdLinks.add(node.url);
      }
    }
    function linkReferenceVisitor(node) {
      referencedIdentifiers.add(node.identifier);
    }
    function definitionVisitor(node) {
      if (
        node.url &&
        isLocalMarkdownLink(node.url) &&
        referencedIdentifiers.has(node.identifier)
      ) {
        localMdLinks.add(node.url);
      }
    }

    file.data.localMarkdownLinks = Array.from(localMdLinks);
  }

  return transformer;
}

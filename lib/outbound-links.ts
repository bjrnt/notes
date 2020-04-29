import visit from "unist-util-visit-parents";
import is from "unist-util-is";
import unified from "unified";
import remarkStringify from "remark-stringify";
import { formatContext } from "./context-formatter";

// TODO: remake strip-markdown later to have better control over contexts
const contextProcessor = unified().use(remarkStringify);

function isLocalMarkdownLink(url: string): boolean {
  return url.match(/^\.\/.+\.md$/) != null;
}

export function outboundLinks() {
  function outboundLinksTransformer(tree, file) {
    const urlToLink = new Map();
    const identifierToUrl = new Map();

    visit(tree, "link", linkVisitor);
    visit(tree, "definition", definitionVisitor);
    visit(tree, "linkReference", linkReferenceVisitor);

    function linkVisitor(node, ancestors) {
      if (node.url && isLocalMarkdownLink(node.url)) {
        const contextNode = findClosestParagraph(ancestors);
        const formattedContext = formatContext(contextNode, node);
        const contextMd = contextProcessor.stringify(formattedContext);
        if (!urlToLink.has(node.url)) {
          urlToLink.set(node.url, { context: contextMd, url: node.url });
        }
      }
    }
    function definitionVisitor(node) {
      if (node.url && isLocalMarkdownLink(node.url)) {
        identifierToUrl.set(node.identifier, node.url);
      }
    }
    function linkReferenceVisitor(node, ancestors) {
      const url = identifierToUrl.get(node.identifier);
      if (url != null) {
        const contextNode = findClosestParagraph(ancestors);
        const formattedContext = formatContext(contextNode, node);
        const contextMd = contextProcessor.stringify(formattedContext);
        if (!urlToLink.has(url)) {
          urlToLink.set(url, { context: contextMd, url });
        }
      }
    }

    file.data.outboundLinks = Array.from(urlToLink.values());
  }

  return outboundLinksTransformer;
}

function findClosestParagraph(ancestors) {
  for (let i = ancestors.length - 1; i >= 0; i--) {
    if (is(ancestors[i], "paragraph")) {
      return ancestors[i];
    }
  }
}

import visit from "unist-util-visit-parents";
import is from "unist-util-is";
import unified, { Transformer } from "unified";
import * as unist from "unist";
import * as mdast from "mdast";
import { VFile } from "vfile";
import remarkStringify from "remark-stringify";
import { formatContext } from "./context-formatter";

const contextProcessor = unified().use(remarkStringify);

interface Link {
  context: string;
  url: string;
}

class OutboundLinkExtractor {
  urlToLink = new Map<string, Link>();
  identifierToUrl = new Map<string, string>();

  constructor(tree: unist.Node, file: VFile) {
    visit(tree, "link" as mdast.Link["type"], this.linkVisitor.bind(this));
    visit(
      tree,
      "definition" as mdast.Definition["type"],
      this.definitionVisitor.bind(this)
    );
    visit(
      tree,
      "linkReference" as mdast.LinkReference["type"],
      this.linkReferenceVisitor.bind(this)
    );

    file.data["outboundLinks"] = Array.from(this.urlToLink.values());
  }

  private linkVisitor(node: mdast.Link, ancestors: unist.Parent[]) {
    const url = node.url;
    if (!isLocalMarkdownLink(url) || this.urlToLink.has(url)) {
      return;
    }

    const context = this.highlightInContext(ancestors, node);
    this.urlToLink.set(url, { context, url });
  }

  private definitionVisitor({ url, identifier }: mdast.Definition) {
    if (!isLocalMarkdownLink(url)) {
      return;
    }
    this.identifierToUrl.set(identifier, url);
  }

  private linkReferenceVisitor(
    node: mdast.LinkReference,
    ancestors: unist.Parent[]
  ) {
    const url = this.identifierToUrl.get(node.identifier);
    if (url == null || this.urlToLink.has(url)) {
      return;
    }

    const context = this.highlightInContext(ancestors, node);
    this.urlToLink.set(url, { context, url });
  }

  private highlightInContext(
    ancestors: unist.Parent[],
    highlighted: unist.Parent
  ): string {
    const closestBlock = findClosestBlock(ancestors);
    const formattedContext = formatContext(closestBlock, highlighted);
    return contextProcessor.stringify(formattedContext);
  }
}

export function outboundLinks(): Transformer {
  return (tree, file) => {
    new OutboundLinkExtractor(tree, file);
  };
}

function findClosestBlock(ancestors: unist.Parent[]): unist.Parent {
  for (let i = ancestors.length - 1; i >= 0; i--) {
    if (is(ancestors[i], "paragraph")) {
      return ancestors[i];
    }
  }
}

function isLocalMarkdownLink(url: string): boolean {
  return url.match(/^\.\/.+\.md$/) != null;
}

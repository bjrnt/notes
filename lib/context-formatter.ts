import * as unist from "unist";

const formatMap: any = {
  heading: paragraph,
  text: text,
  inlineCode: text,
  image: empty,
  imageReference: empty,
  break: lineBreak,

  blockquote: children,
  list: children,
  listItem: children,
  strong: children,
  emphasis: children,
  delete: children,
  link: children,
  linkReference: children,
  footnoteReference: empty,

  code: empty,
  thematicBreak: empty,
  html: empty,
  table: empty,
  tableCell: empty,
  definition: empty,
  yaml: empty,
};

// got to be careful here not to edit the original nodes, as that would break any other references that exist within the same context
export function formatContext(
  context: unist.Parent,
  highlighted: unist.Parent
): unist.Parent {
  function one(node: unist.Node | unist.Parent): any {
    let newNode: any = { ...node };
    const type = newNode && newNode.type;

    if (node === highlighted) {
      newNode = strong(newNode);
    } else if (type in formatMap) {
      newNode = formatMap[type](newNode);
    }

    if (newNode.length) {
      newNode = all(newNode);
    }

    if (newNode.children) {
      newNode.children = all(newNode.children as unist.Node[]);
    }

    return newNode;
  }

  function all(nodes: any[]) {
    let index = -1;
    const length = nodes.length;
    let result = [];

    while (++index < length) {
      const value = one(nodes[index]);
      if (value && typeof value.length === "number") {
        result = result.concat((value as any).map(one));
      } else {
        result.push(value);
      }
    }

    return clean(result);
  }

  // merges texts
  function clean(values: any[]) {
    let index = -1;
    const length = values.length;
    const result = [];
    let previous = null;

    while (++index < length) {
      const value = values[index];

      if (previous && "value" in value && value.type === previous.type) {
        previous.value += value.value;
      } else {
        result.push(value);
        previous = value;
      }
    }

    return result;
  }

  return one({ ...context } as typeof context);
}

function text(node: unist.Literal): unist.Literal {
  return { type: "text", value: node.value };
}

function paragraph(node: unist.Parent): unist.Parent {
  return { type: "paragraph", children: node.children };
}

function children(node: unist.Parent): unist.Node[] {
  return node.children || [];
}

function lineBreak(): unist.Literal {
  return { type: "text", value: "\n" };
}

function empty(): unist.Literal {
  return { type: "text", value: "" };
}

function strong(node: unist.Parent): unist.Parent {
  return { type: "strong", children: node.children };
}

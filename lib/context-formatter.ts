const formatMap = {
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
  horizontalRule: empty,
  thematicBreak: empty,
  html: empty,
  table: empty,
  tableCell: empty,
  definition: empty,
  yaml: empty,
  toml: empty,
};

// got to be careful here not to edit the original nodes, as that would break any other references that exist within the same context
export function formatContext(context, highlighted) {
  function one(node) {
    let newNode = { ...node };
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
      newNode.children = all(newNode.children);
    }

    return newNode;
  }

  function all(nodes) {
    let index = -1;
    const length = nodes.length;
    let result = [];

    while (++index < length) {
      const value = one(nodes[index]);
      if (value && typeof value.length === "number") {
        result = result.concat(value.map(one));
      } else {
        result.push(value);
      }
    }

    return clean(result);
  }

  // merges texts
  function clean(values) {
    var index = -1;
    var length = values.length;
    var result = [];
    var previous = null;
    var value;

    while (++index < length) {
      value = values[index];

      if (previous && "value" in value && value.type === previous.type) {
        previous.value += value.value;
      } else {
        result.push(value);
        previous = value;
      }
    }

    return result;
  }

  return one({ ...context });
}

function text(node) {
  return { type: "text", value: node.value };
}

function paragraph(node) {
  return { type: "paragraph", children: node.children };
}

function children(node) {
  return node.children || [];
}

function lineBreak() {
  return { type: "text", value: "\n" };
}

function empty() {
  return { type: "text", value: "" };
}

function strong(node) {
  return { type: "strong", children: node.children };
}

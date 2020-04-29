const markdown = require("remark-parse");
const footnotes = require("remark-footnotes");
const unified = require("unified");
const fs = require("fs");
const util = require("util");

const contextProcessor = unified().use(markdown).use(footnotes);

function printAst(markdown) {
  const node = contextProcessor.parse(markdown);
  printAstNode(node);
}

function printAstNode(node) {
  console.log(util.inspect(node, false, 500, true));
}

if (!module.parent) {
  const contents = fs.readFileSync(process.argv[2]).toString();
  printAst(contents);
}

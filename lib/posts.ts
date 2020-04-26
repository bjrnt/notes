import fs from "fs";
import path from "path";
import matter from "gray-matter";
import unified from "unified";
import visit from "unist-util-visit";
import vfile from "to-vfile";
import markdown from "remark-parse";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.match(/\.md$/))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      return {
        params: {
          id,
        },
      };
    });
}

const parser = unified().use(markdown);
const processor = unified().use(inboundLinksAttacher);
function inboundLinksAttacher() {
  function isLocalMarkdownLink(url: string): boolean {
    return url.match(/^\.\/.+\.md$/) != null;
  }

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

export function getInboundLinksMap(): Map<string, string[]> {
  const outgoingLinksMap = new Map();

  const fileNames = fs.readdirSync(postsDirectory);
  fileNames
    .filter((fileName) => fileName.match(/\.md$/))
    .forEach((fileName) => {
      const doc = vfile.readSync(path.join(postsDirectory, fileName));
      processor.runSync(parser.parse(doc), doc);
      outgoingLinksMap.set(doc.stem, doc.data.localMarkdownLinks);
    });

  const incomingLinksMap = new Map();
  for (let from of outgoingLinksMap.keys()) {
    const tos = outgoingLinksMap.get(from);
    for (let to of tos) {
      to = to.replace(/\.md$/, "").replace(/^\.\//, "");
      if (!incomingLinksMap.has(to)) {
        incomingLinksMap.set(to, []);
      }
      incomingLinksMap.get(to).push(from);
    }
  }

  return incomingLinksMap;
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  return {
    id,
    contents: matterResult.content,
    ...matterResult.data,
  };
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.match(/\.md$/))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      return {
        id,
        ...matterResult.data,
      };
    });

  return allPostsData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

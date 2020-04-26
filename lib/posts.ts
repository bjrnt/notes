import fs from "fs";
import path from "path";
import { Post } from "./post";
import { loadAllPosts } from "./post-loader";

const postsDirectory = path.join(process.cwd(), "posts");
let cachedPostsMap: Map<string, Post> | null = null;

export function listPostPaths(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(postsDirectory, (err, files) => {
      if (err) {
        return reject(err);
      }
      return resolve(
        files
          .filter((file) => file.match(/\.md$/))
          .map((file) => path.join(postsDirectory, file))
      );
    });
  });
}

export async function getAllPostIds(): Promise<string[]> {
  const postFiles = await listPostPaths();
  const ids = postFiles.map(postFilenameToId);
  return ids;
}

export function postFilenameToId(file: string): string {
  const parts = file.split("/");
  const id = parts[parts.length - 1].replace(/\.md$/, "");
  return id;
}

export async function getPostData(id: string): Promise<Post> {
  await loadPostsMap();
  return cachedPostsMap.get(id);
}

export function getPostsIndex() {
  return [];
}

async function loadPostsMap() {
  const paths = await listPostPaths();
  const postMap = await loadAllPosts(paths);
  cachedPostsMap = postMap;
}

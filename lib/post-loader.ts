import { Post } from "./post";
import unified from "unified";
import markdown from "remark-parse";
import vfile from "to-vfile";
import { VFile } from "vfile";
import { postFilenameToId } from "./posts";
import { outboundLinks } from "./outbound-links";
import { titles } from "./titles";

const parser = unified().use(markdown);
const processor = unified().use(outboundLinks).use(titles);

export async function loadAllPosts(
  paths: string[]
): Promise<Map<string, Post>> {
  const posts = await Promise.all(paths.map(loadPost));
  const idToPost = new Map<string, Post>();
  const idToOutbound = new Map<string, { id: string; context: string }[]>();
  const idToInbound = new Map<string, { id: string; context: string }[]>();

  for (let { post, outbound } of posts) {
    idToPost.set(post.id, post);
    idToOutbound.set(post.id, outbound);
    for (let out of outbound) {
      if (!idToInbound.has(out.id)) {
        idToInbound.set(out.id, []);
      }
      idToInbound.get(out.id).push({ id: post.id, context: out.context });
    }
  }

  for (let [id, inbound] of idToInbound) {
    idToPost.get(id).inboundLinks = inbound.map((inbound) => ({
      ...inbound,
      title: idToPost.get(inbound.id).title,
    }));
  }

  return idToPost;
}

async function loadPost(
  path: string
): Promise<{ post: Post; outbound: { context: string; id: string }[] }> {
  const postFile: VFile = await vfile.read(path);
  await processor.run(parser.parse(postFile), postFile);

  const post = {
    id: postFile.stem,
    title: postFile.data["title"] || "",
    contents: postFile.contents.toString(),
    outboundLinks: [],
    inboundLinks: [],
  };

  return {
    post,
    outbound: postFile.data["outboundLinks"].map((link) => ({
      ...link,
      id: postFilenameToId(link.url),
    })),
  };
}

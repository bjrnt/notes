import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import unified from "unified";
import * as React from "react";
import remark2rehype from "remark-rehype";
import rehype2react from "rehype-react";
import markdown from "remark-parse";
import footnotes from "remark-footnotes";
import { MarkdownLink } from "../../components/markdown-link";
import Link from "next/link";
import { Post as PostData } from "../../lib/post";

const markdownProcessor = unified()
  .use(markdown)
  .use(footnotes, { inlineNotes: true })
  .use(remark2rehype)
  .use(rehype2react, {
    createElement: React.createElement,
    components: {
      a: MarkdownLink,
    },
  });

export default function Post({ post }: { post: PostData }) {
  return (
    <Layout>
      {(markdownProcessor.processSync(post.contents) as any).result}
      <br />
      {post.inboundLinks.length > 0 && (
        <>
          <br />
          <h3>Inbound Links</h3>
          {post.inboundLinks.map((link) => (
            <Link href="/posts/[id]" as={`/posts/${link.id}`} key={link.id}>
              <button className="text-left mb-2 bg-gray-200 p-2">
                <b>{link.title}</b>
                <p>{link.context}</p>
              </button>
            </Link>
          ))}
        </>
      )}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths: paths.map((path) => `/posts/${path}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostData(params.id.toString());
  return {
    props: {
      post,
    },
  };
};

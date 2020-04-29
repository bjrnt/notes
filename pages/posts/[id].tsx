import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import unified from "unified";
import * as React from "react";
import remark2rehype from "remark-rehype";
import rehype2react from "rehype-react";
import markdown from "remark-parse";
import footnotes from "remark-footnotes";
import numberedFootnotes from "remark-numbered-footnotes";
import { MarkdownLink } from "../../components/markdown-link";
import Link from "next/link";
import { Post as PostData } from "../../lib/post";
import styles from "./markdown.module.css";

const markdownProcessor = unified()
  .use(markdown)
  .use(footnotes, { inlineNotes: true })
  .use(numberedFootnotes)
  .use(remark2rehype)
  .use(rehype2react, {
    createElement: React.createElement,
    components: {
      a: MarkdownLink,
      img: Image,
    },
  });

export default function Post({ post }: { post: PostData }) {
  return (
    <Layout>
      <div className={styles.container}>
        {(markdownProcessor.processSync(post.contents) as any).result}
      </div>
      <br />
      {post.inboundLinks.length > 0 && (
        <InboundLinks links={post.inboundLinks} />
      )}
    </Layout>
  );
}

function Image({ src, ...rest }) {
  const modifiedSrc = `/${src.slice(2)}`;
  return <img src={modifiedSrc} {...rest} />;
}

function InboundLinks({ links }) {
  return (
    <div className="bg-gray-200 p-3 rounded-lg">
      <h5 className="mt-0 text-gray-500 leading-tight mb-2">Inbound Links</h5>
      <div className="flex flex-wrap">
        {links.map((link) => (
          <Link href="/posts/[id]" as={`/posts/${link.id}`} key={link.id}>
            <button className="w-1/2 h-32 text-left p-2 opacity-50 hover:opacity-75 hover:bg-gray-400 rounded-md text-sm flex flex-col">
              <strong>{link.title}</strong>
              <div className="overflow-y-auto text-gray-700">
                {(markdownProcessor.processSync(link.context) as any).result}
              </div>
            </button>
          </Link>
        ))}
      </div>
    </div>
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

import Layout from "../../components/layout";
import {
  getAllPostIds,
  getPostData,
  getInboundLinksMap,
} from "../../lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import unified from "unified";
import * as React from "react";
import remark2rehype from "remark-rehype";
import rehype2react from "rehype-react";
import markdown from "remark-parse";
import footnotes from "remark-footnotes";
import { MarkdownLink } from "../../components/markdown-link";
import Link from "next/link";

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

export default function Post({
  postData,
  inboundLinks,
}: {
  postData: {
    title: string;
    date: string;
    contents: string;
  };
  inboundLinks: string[];
}) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.date}
      <br />
      {(markdownProcessor.processSync(postData.contents) as any).result}
      <br />
      {inboundLinks.length > 0 && (
        <>
          <br />
          Inbound Links:
          <ul>
            {inboundLinks.map((link) => (
              <li key={link}>
                <Link href="/posts/[id]" as={`/posts/${link}`}>
                  <a>{link}</a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const inboundLinksMap = getInboundLinksMap();
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
      inboundLinks: inboundLinksMap.get(params.id.toString()) || [],
    },
  };
};

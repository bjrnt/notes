import Layout from "../components/layout";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getPostsIndex } from "../lib/posts";

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <h1>Welcome!</h1>
      <p>
        These are my personal notes from books, podcasts, conversations with
        friends, and much more. I have written these for myself but am sharing
        them online in the hope that they may prove useful to someone else out
        there.
      </p>
      <p>
        I have tried to include sources and references where I can but please
        understand that a lot of the content is paraphrased on rewritten based
        on my understanding of the subject and may therefore contain errors. If
        you spot any such errors, feel free to let me know!
      </p>
      <span>Here is a random selection of posts to start browsing from:</span>
      <ul>
        {allPostsData.map(({ id, title }) => (
          <li key={id}>
            <Link href="/posts/[id]" as={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getPostsIndex();
  return {
    props: { allPostsData },
  };
};

import Layout from "../components/layout";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getPostsIndex } from "../lib/posts";

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <div className="p-4 shadow rounded bg-white">
        <h1 className="text-purple-500 leading-normal">Next.js</h1>
        <p className="text-gray-500">with Tailwind CSS</p>
      </div>
      {allPostsData.map(({ id, date, title }) => (
        <li key={id}>
          <Link href="/posts/[id]" as={`/posts/${id}`}>
            <a>{title || id}</a>
          </Link>
          <br />
          {id}
          <br />
          {date}
        </li>
      ))}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getPostsIndex();
  return {
    props: { allPostsData },
  };
};

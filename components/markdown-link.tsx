import Link from "next/link";

export function MarkdownLink({ href, children, ...rest }: any) {
  if (href.match(/^\.\/.+\.md$/)) {
    const id = href.slice(2).replace(/\.md$/, "");
    return (
      <Link href="/posts/[id]" as={`/posts/${id}`}>
        <a>{children}</a>
      </Link>
    );
  }

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

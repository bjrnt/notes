import Link from "next/link";

type LinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

/**
 * Link to another note.
 */
function NoteLink({ href, children, ...rest }: LinkProps) {
  const id = href.slice(2).replace(/\.md$/, "");
  return (
    <Link href="/posts/[id]" as={`/posts/${id}`}>
      <a {...rest}>{children}</a>
    </Link>
  );
}

/**
 * Link to a footnote/reference.
 */
function FootnoteLink({ children, ...rest }: LinkProps) {
  return <a {...rest}>[{children}]</a>;
}

/**
 * General link
 */
export function MarkdownLink(props: LinkProps) {
  if (props.href.match(/^\.\/.+\.md$/)) {
    return <NoteLink {...props} />;
  }

  if (props.className === "footnote-ref") {
    return <FootnoteLink {...props} />;
  }

  return <a {...props} />;
}

import Document, {
  Html,
  Main,
  Head,
  NextScript,
  DocumentContext,
} from "next/document";

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return { ...(await Document.getInitialProps(ctx)) };
  }

  render() {
    return (
      <Html
        style={{ fontSize: "17px" }}
        className="text-gray-900 antialiased leading-normal bg-gray-100 whitespace-normal font-sans leading-normal tracking-normal text-base"
      >
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

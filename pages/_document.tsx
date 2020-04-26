import Document, { Html, Main, Head, NextScript } from "next/document";

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: any) {
    return { ...(await Document.getInitialProps(ctx)) };
  }

  render() {
    return (
      <Html className="text-gray-900 antialiased leading-normal bg-gray-100 whitespace-normal">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

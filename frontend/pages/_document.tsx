import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/globe.svg" />
        <link rel="icon" href="/globe.svg" />
        <link rel="apple-touch-icon" href="/globe.svg" />
        <link rel="apple-touch-icon-precomposed" href="/globe.svg" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

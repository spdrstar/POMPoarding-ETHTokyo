/**
 * Can delete file if not using @magiclabs/ui
 */
import React from "react";
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { DEFAULT_THEME, getThemeVariables } from '@magiclabs/ui';
import { CssBaseline } from "@nextui-org/react";
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <style
            type='text/css'
            dangerouslySetInnerHTML={{ __html: getThemeVariables(DEFAULT_THEME).toCSS() }}
          />
          {CssBaseline.flush()}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

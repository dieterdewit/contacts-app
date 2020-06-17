// Adjust render options for Next.js to adapt to Material-UI SSR options

import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../src/theme';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="es">
                <Head>
                    <meta name="theme-color" content={ theme.palette.primary.main } />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap"
                    />
                    <link
                        rel="shortcut icon"
                        href="/favicon/Contacts.ico"
                    />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

// Asynchronous Server-rendering Material-UI requirements
MyDocument.getInitialProps = async (ctx) => {
    // Rendering order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};

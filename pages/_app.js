// Initialize Pages with Persisting Page Layout

import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';
import Footer from "../components/layout/Footer";
import AppHeader from "../components/layout/AppBar";

export default function MyApp(props) {
    const { Component, pageProps } = props;

    React.useEffect(() => {
            // Remove the server-side injected CSS.
            const jssStyles = document.querySelector('#jss-server-side');
            if (jssStyles) {
                jssStyles.parentElement.removeChild(jssStyles);
            }
        }, []
    );

    return (
        <React.Fragment>
            <Head>
                <title>Contacts App</title>
                <meta
                    name="description"
                    content="Contacts Management application developed with React, Next.js & Material-UI"
                />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={ theme }>
                <CssBaseline />
                <AppHeader />
                <Component {...pageProps} />
                <Footer />
            </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

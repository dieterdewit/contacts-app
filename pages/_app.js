// Initialize Pages with Persisting Page Layout

import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';
import Store from '../redux/store';
import Footer from "../components/layout/Footer";
import AppHeader from "../components/layout/AppBar";

const store = Store();

function MyApp(props) {
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
        <Provider store={ store }>
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
        </Provider>
    );
}

MyApp.getInitialProps = async ({Component, ctx}) => {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    // Anything returned here can be accessed by the client
    return { pageProps: pageProps };
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

// Returns a new store for every request
const makeStore = () => store;

// Wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);
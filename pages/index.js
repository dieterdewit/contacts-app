import React from 'react';
import Head from "next/head";

export default function Index() {
    return (
        <React.Fragment>
            <Head>
                <title>Contacts App</title>
                <meta
                    name="description"
                    content="Contacts Management application developed with React, Next.js & Material-UI"
                />
            </Head>
        </React.Fragment>
    );
}

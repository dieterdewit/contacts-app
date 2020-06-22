import React from 'react';
import Head from "next/head";
import { checkServerSideCookie } from "../redux/actions/loginActions";

function Contacts(props) {
    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <React.Fragment>
            <Head>
                <title>Contacts Book | Contacts App</title>
                <meta
                    name="description"
                    content="Contacts Book Management and Views for Contacts App"
                />
            </Head>
            <div>Prop from Redux {JSON.stringify(props)}</div>
            <button onClick={handleSubmit}>Load</button>
            <div>Prop from getInitialProps {props.custom}</div>
        </React.Fragment>
    );
}

Contacts.getInitialProps = async ctx => {
    const ssrToken = checkServerSideCookie(ctx);

    const { token } = ctx.store.getState().logged.logged.token;


};

export default Contacts;
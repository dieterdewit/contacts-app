import React from 'react';
import Head from "next/head";
import { connect } from 'react-redux';
import { getContacts } from "../redux/actions/contactsAction";

function Contacts(props) {
    const handleSubmit = e => {
        e.preventDefault();
        props.getContacts();
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

Contacts.getInitialProps = async ({ store, isServer, pathname, query }) => {
    await store.dispatch(getContacts());
    return { custom: 'custom' };
};

export default connect(
    state => state,
    { getContacts }
)(Contacts);
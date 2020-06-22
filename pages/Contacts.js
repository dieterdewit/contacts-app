import React, {useState} from 'react';
import Head from "next/head";
import axios from 'axios';
import { checkServerSideCookie } from "../redux/actions/loginActions";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

function Contacts({contacts}) {
    const [openContacts, setOpenContacts] = useState(false);
    const handleSubmit = e => {
        e.preventDefault();
        setOpenContacts(!openContacts);
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
            <Container maxWidth='lg'>
                <Typography variant='h1'>
                    Welcome to your Contacts
                </Typography>
                <div>Your Contacts Raw: {JSON.stringify(contacts)}</div>
                <Button
                    style={{ marginBottom: 15, marginTop: 10 }}
                    onClick={ handleSubmit }
                    variant={'outlined'}
                >
                    Load
                </Button>
                {openContacts && (
                    <Grid item>
                        {
                            contacts.map(
                                ({full_name, email, updatedOn}) =>
                                    <Paper
                                        style={{ marginBottom: 10, padding: 10 }}
                                    >
                                        <Typography variant='h4'>
                                            {full_name}
                                        </Typography>
                                        <Typography variant='body1'>
                                            {email}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {updatedOn}
                                        </Typography>
                                    </Paper>
                        )}
                    </Grid>
                )}
            </Container>
        </React.Fragment>
    );
}

Contacts.getInitialProps = async ctx => {
    const ssrToken = checkServerSideCookie(ctx);

    const { token } = ctx.store.getState().logged.logged.token;
    const userId = ctx.store.getState().logged.logged.userId;

    if (token || ssrToken){
        const response = await axios.get(`http://localhost:3100/api/contacts/` + userId, {
            headers: {
                contentType: 'application/json',
                token: token || ssrToken
            }
        });
        const contacts = response.data;
        return {
            contacts
        };
    }
};

export default Contacts;
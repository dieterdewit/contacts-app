import React, {useState} from 'react';
import Head from "next/head";
import axios from 'axios';
import { checkServerSideCookie } from "../redux/actions/loginActions";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Pagination from "@material-ui/lab/Pagination";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
    title: {
        marginTop: 30,
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    RespImage: {
        maxHeight: 390,
        maxWidth: '100%',
    },
    BoxImage: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

function Contacts({contacts}) {
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const [openContacts, setOpenContacts] = useState(false);

    const handleSubmit = (event, value) => {
        event.preventDefault();
        setOpenContacts(!openContacts);

        setPage(value);
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
                <Typography variant='h2' className={classes.title}>
                    Welcome to your Contacts
                </Typography>
                <Divider />
                <Pagination
                    count={Math.ceil(contacts.length/10)}
                    page={page}
                    style={{ marginBottom: 15, marginTop: 10 }}
                    onChange={handleSubmit}
                    variant="outlined"
                    color="secondary"
                />
                <Grid item>
                    {
                        contacts.slice((page-1)*10, (page*10)-1).map(
                            ({full_name, email, image_uri, updatedOn}) =>
                                <Paper
                                    style={{ marginBottom: 10, padding: 10 }}
                                >
                                    <Grid
                                        container
                                        justify="center"
                                    >
                                        <Grid item xs={12}>
                                            <Grid container justify="center">
                                                <Box
                                                    flexGrow={1}
                                                    p={1}
                                                    className={ classes.BoxImage }
                                                >
                                                    <img
                                                        src={image_uri}
                                                        className={ classes.RespImage }
                                                    />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
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
            </Container>
        </React.Fragment>
    );
}

Contacts.getInitialProps = async ctx => {
    const ssrToken = checkServerSideCookie(ctx);

    const token = ctx.store.getState().logged.logged.token;
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
    else {
        const contacts = []
        return {
            contacts
        };
    }
};

export default Contacts;
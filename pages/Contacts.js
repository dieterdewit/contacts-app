import React, {useEffect, useState} from 'react';
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
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import TextField from "@material-ui/core/TextField";
import Router from "next/router";
import MaterialTable from 'material-table';


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
    submitButton: {
        color: 'red'
    }
}));

function FullInfoDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [phones, setPhones] = React.useState([]);

    const handleClickOpen = () => {
        axios.get(`http://localhost:3100/api/phone/` + props.contact_id, {
        })
            .then(response => {
                setPhones(response.data);
                setOpen(true);
            })
            .catch(error => {
                alert(JSON.stringify(error));
            })
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open Contact Details
            </Button>
            <Dialog
                maxWidth={'xl'}
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
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
                                    src={props.image_uri}
                                    className={ classes.RespImage }
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <DialogTitle id="dialog-title">{props.full_name}</DialogTitle>
                <DialogContent>
                    <MailIcon/>
                    <DialogContentText>
                        {props.email}
                    </DialogContentText>
                    {
                        phones
                            .filter(
                                (contact_info) =>
                                    contact_info.contact_id === props.contact_id)
                            .map(
                                ({phone_number, phone_tag}) =>
                                    <React.Fragment>
                                        <PhoneIcon/>
                                        <DialogContent>
                                            {phone_number}
                                        </DialogContent>
                                        <DialogContent>
                                            {phone_tag}
                                        </DialogContent>
                                    </React.Fragment>
                            )
                    }
                    <DialogContentText>
                        {props.updatedOn}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

function EditInfoDialog(props) {
    const [open, setOpen] = React.useState(false);
    let name;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = e => {
        e.preventDefault();
        axios.post(`http://localhost:3100/api/uncontact/` + props.contact_id,{
            name : name.value
        })
            .then(response => {
                setOpen(false);
                Router.push('/Contacts');
            })
            .catch(error => {
                setOpen(false);
                alert(JSON.stringify(error));
            })
    };

    return (
        <React.Fragment>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Update Contact Name
            </Button>
            <Dialog
                maxWidth={'xl'}
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
            >
                <DialogTitle id="dialog-title">Change Contact Name</DialogTitle>
                <DialogContent>
                    <TextField
                        id="name"
                        label="name"
                        variant="outlined"
                        type={"name"}
                        style={{width: '100%'}}
                        inputRef={ref => {
                            name = ref;
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Save & Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

function Contacts({contacts}) {
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const [openContacts, setOpenContacts] = useState(false);
    const [toggleView, setOpenToggleView] = useState(false);

    const columns = [
        { title: 'contact_id', field: 'contact_id' },
        { title: 'user_id', field: 'user_id' },
        { title: 'full_name', field: 'full_name' },
        { title: 'email', field: 'email' },
        { title: 'image_uri', field: 'image_uri' },
        { title: 'updated_on', field: 'updated_on' },
    ]

    const handleClickOpen = e => {
        setOpenToggleView(!toggleView);
    }

    const handleSubmit = (event, value) => {
        event.preventDefault();
        setOpenContacts(!openContacts);

        setPage(value);
    };

    const handleDelete = (contact_id) => {
        axios.delete(`http://localhost:3100/api/uncontact/` + contact_id,)
            .then(response => {
                Router.push('/Contacts');
            })
            .catch(error => {
                alert(JSON.stringify(error));
            })
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
                {
                    !toggleView &&
                    <Grid item>
                        <Grid container>
                            {
                                contacts.slice((page - 1) * 10, (page * 10)).map(
                                    ({contact_id, full_name, email, image_uri, updatedOn}) =>
                                        <Paper
                                            style={{margin: 10, padding: 10, width: '45%'}}
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
                                                            className={classes.BoxImage}
                                                        >
                                                            <img
                                                                src={image_uri}
                                                                className={classes.RespImage}
                                                            />
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Typography variant='h4'>
                                                {full_name}
                                            </Typography>
                                            <FullInfoDialog contact_id={contact_id} full_name={full_name} email={email}
                                                            image_uri={image_uri} updatedOn={updatedOn}/>
                                            <EditInfoDialog contact_id={contact_id}/>
                                            <Button
                                                disableRipple
                                                className={classes.submitButton}
                                                variant={"outlined"}
                                                onClick={() => handleDelete(contact_id)}
                                            >
                                                Delete
                                            </Button>
                                        </Paper>
                                )}
                        </Grid>
                    </Grid>
                }
                {
                    toggleView &&
                    <MaterialTable
                        title="Table"
                        columns={columns}
                        data={contacts}
                    />
                }
                <Button
                    disableRipple
                    variant={"outlined"}
                    onClick={handleClickOpen}
                >
                    Toggle View
                </Button>
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
import React, { Component } from 'react';
import Head from "next/head";
import axios from 'axios';
import { checkServerSideCookie } from "../redux/actions/loginActions";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MailIcon from '@material-ui/icons/Mail';
import ImageIcon from '@material-ui/icons/Image';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Link from "../components/Link"
import Box from "@material-ui/core/Box";
import PhoneIcon from '@material-ui/icons/Phone';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
    title: {
        marginTop: 30,
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    Containers: {
        margin: 15
    },
    Papers: {
        padding: 10
    },
    icons: {
        color: theme.palette.primary.main,
        fontSize: 50,
        marginRight: 25
    },
    inputLine: {
        marginTop: 30
    },
    submitButton: {
        marginTop: 30,
        color: theme.palette.secondary.main,
        fontWeight: 'bold'
    },
    BackButtonIcon: {
        marginTop: 5,
        marginBottom: 12,
    },
    BackButtonText: {
        fontWeight: 'bold',
        color: 'dimgray',
        alignSelf: 'flex-end',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

class ImagesUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            success: false,
            url: "",
            open: false
        }
    }

    handleChange = (ev) => {
        this.setState({success: false, url : ""});
    }

    handleUpload = (ev) => {
        this.setState({open: true});
        let file = this.uploadInput.files[0];
        let fileParts = this.uploadInput.files[0].name.split('.');
        let fileName = fileParts[0];
        let fileType = fileParts[1];

        axios.post("http://localhost:3100/api/images",{
            fileName : fileName,
            fileType : fileType,
            contactId: this.props.contactId
        })
            .then(response => {
                const returnData = response.data.data.returnData;
                const signedRequest = returnData.signedRequest;
                const url = returnData.url;
                this.setState({url: url})

                const options = {
                    headers: {
                        'Content-Type': fileType
                    }
                };
                axios.put(signedRequest,file,options)
                    .then(result => {
                        this.setState({success: true});
                        this.setState({open: false});
                    })
                    .catch(error => {
                        this.setState({open: false});
                        alert("ERROR " + JSON.stringify(error));
                    })
            })
            .catch(error => {
                this.setState({open: false});
                alert(JSON.stringify(error));
            })
    }


    render() {
        const Success_message = () => (
            <React.Fragment style={{padding:50}}>
                <Typography
                    style={{color: 'green'}}
                    variant='h5'
                >
                    Contact Image Added
                </Typography>
                <a
                    href={this.state.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Preview the Image here
                </a>
                <br/>
            </React.Fragment>
        )
        return (
            <React.Fragment>
                <Typography variant='h4' color='secondary'>Add Image for Contact</Typography>
                {
                    this.state.success ?
                        <Success_message/>
                        : null
                }
                <ImageIcon style={{ fontSize: 50, marginTop: 10, color: '#019dd6' }}/>
                <Input
                    onChange={this.handleChange}
                    inputRef={(ref) => {
                        this.uploadInput = ref;
                    }}
                    type="file"
                    style={{ margin: 10 }}
                />
                <br/>
                {
                    this.uploadInput ?
                        <Button
                            onClick={this.handleUpload}
                            variant={'outlined'}
                            style={{ margin: 10 }}
                        >
                            Upload Image
                        </Button>
                        : null
                }
                <Backdrop style={{ zIndex: +1, color: '#fff' }} open={this.state.open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </React.Fragment>
        );
    }
}

function Add({ atts }) {
    const classes = useStyles();

    let name;
    let email;
    let phone_number;

    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [contactId, setContactId] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const handleChange = event => {
        setPhone(event.target.value);
        console.log(phone)
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpenSuccess(false);
        setOpenError(false);
    };

    const handleCreate = e => {
        e.preventDefault();
        axios.post(`http://localhost:3100/api/contacts/` + atts.userId,{
            full_name : name.value,
            email : email.value
        }, {
            headers: {
                token: atts.token || atts.ssrToken
            }
        })
            .then(response => {
               if(response.data.status === 200){
                   setOpenSuccess(true);
                   setContactId(response.data.contactId);
               }
               else {
                   setOpenError(true);
               }
            })
            .catch(error => {
                setOpenError(true);
                alert(JSON.stringify(error));
            })
    }

    const handlePhone = e => {
        e.preventDefault();
        axios.post(`http://localhost:3100/api/phone/` + contactId,{
            phone_number : phone_number.value,
            phone_tag : phone
        }, {
            headers: {
                token: atts.token || atts.ssrToken
            }
        })
            .then(response => {
                if(response.data.status === 200){
                    setOpenSuccess(true);
                }
                else {
                    setOpenError(true);
                }
            })
            .catch(error => {
                setOpenError(true);
                alert(JSON.stringify(error));
            })
    }

    return (
        <React.Fragment>
            <Head>
                <title>Add Contacts | Contacts App</title>
                <meta
                    name="description"
                    content="Add Contact on Contacts App"
                />
            </Head>
            <Container maxWidth='lg'>
                <IconButton
                    aria-label="Atras"
                    className={classes.BackButtonIcon}
                    component={Link}
                    naked
                    href={`/Contacts`}
                >
                    <Box
                        display="flex"
                        flexDirection="row"
                        p={1}
                        css={{ height: 25 }}
                    >
                        <Grid
                            container
                            spacing={2}
                        >
                            <ArrowBackIcon/>
                            <Grid item xs={1} />
                            <Typography className={classes.BackButtonText}>
                                Back to Contacts
                            </Typography>
                        </Grid>
                    </Box>
                </IconButton>
                <Typography variant='h3' className={classes.title}>
                    Add a Contact:
                </Typography>
                <Divider />
                <Grid item xs={12} className={classes.Containers}>
                    <Paper className={classes.Papers}>
                        <Typography variant='h4' color='secondary'>Contact Name</Typography>
                        <Grid className={classes.inputLine}>
                            <PersonAddIcon className={classes.icons}/>
                            <TextField
                                id="name"
                                label="name"
                                variant="outlined"
                                type={"name"}
                                style={{width: '85%'}}
                                inputRef={ref => {
                                    name = ref;
                                }}
                            />
                        </Grid>
                        <Grid className={classes.inputLine}>
                            <MailIcon className={classes.icons}/>
                            <TextField
                                id="email"
                                label="email"
                                variant="outlined"
                                type={"email"}
                                style={{width: '85%'}}
                                inputRef={ref => {
                                    email = ref;
                                }}
                            />
                        </Grid>
                        <Button
                            disableRipple
                            className={ classes.submitButton }
                            variant={ "outlined" }
                            onClick={handleCreate}
                        >
                            Add User
                        </Button>
                    </Paper>
                </Grid>
                {
                    contactId ?
                        <React.Fragment>
                            <Grid item xs={12} className={classes.Containers}>
                                <Paper className={classes.Papers}>
                                    <ImagesUp contactId={contactId}/>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} className={classes.Containers}>
                                <Paper className={classes.Papers}>
                                    <Typography variant='h4' color='secondary'>Contact Phone Numbers</Typography>
                                    <Typography variant='body1' color='primary'>You can add multiple phone numbers here.</Typography>
                                    <Grid className={classes.inputLine}>
                                        <PhoneIcon className={classes.icons}/>
                                        <TextField
                                            id="number"
                                            label="number"
                                            variant="outlined"
                                            type={"number"}
                                            style={{width: '85%'}}
                                            inputRef={ref => {
                                                phone_number = ref;
                                            }}
                                        />
                                    </Grid>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="select-label">Phone Category</InputLabel>
                                        <Select
                                            labelId="select-label"
                                            id="select"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'HOME'}>HOME</MenuItem>
                                            <MenuItem value={'OFFICE'}>OFFICE</MenuItem>
                                            <MenuItem value={'MOBILE'}>MOBILE</MenuItem>
                                            <MenuItem value={'FAX'}>FAX</MenuItem>
                                            <MenuItem value={'PERSONAL'}>PERSONAL</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button
                                        disableRipple
                                        className={ classes.submitButton }
                                        variant={ "outlined" }
                                        onClick={handlePhone}
                                    >
                                        Add Phone Number
                                    </Button>
                                </Paper>
                            </Grid>
                        </React.Fragment>
                        : null
                }
                <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        SUCCESSFUL
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        ERROR: INCOMPLETE OR ERRONEOUS DATA
                    </Alert>
                </Snackbar>
            </Container>
        </React.Fragment>
    );
}

Add.getInitialProps = async ctx => {
    const ssrToken = checkServerSideCookie(ctx);

    const token = ctx.store.getState().logged.logged.token;
    const userId = ctx.store.getState().logged.logged.userId;

    const atts = {
        ssrToken: ssrToken,
        token: token,
        userId: userId
    }

    return {
        atts
    }
};

export default Add;
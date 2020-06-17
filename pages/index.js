import React from 'react';
import Head from "next/head";
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { loginScreen } from '../redux/actions/loginActions';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 80
    },
    secondary: {
        color: theme.palette.secondary.main
    },
    primary: {
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    inputLine: {
        marginTop: 30
    },
    icons: {
        color: theme.palette.primary.main,
        fontSize: 50,
    },
    text: {
        color: theme.palette.text.main,
        marginTop: 50
    },
    button: {
        marginBottom: 120,
        color: theme.palette.primary.main,
        textDecoration: "underline",
        fontWeight: 'bold'
    },
    submitButton: {
        marginTop: 30,
        color: theme.palette.secondary.main,
        fontWeight: 'bold'
    },
}));

function Index(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Head>
                <title>Contacts App</title>
                <meta
                    name="description"
                    content="Contacts Management application developed with React, Next.js & Material-UI"
                />
            </Head>
            <Container
                maxWidth="md"
                className={ classes.root }
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    p={1}
                    style={{ justifyContent: 'center' }}
                >
                    {
                        !props.login &&
                        <Grid item>
                            <Typography className={classes.secondary}>
                                Don't have an Account?
                            </Typography>
                            <Typography
                                variant={'h4'}
                                className={classes.primary}
                            >
                                Register Now:
                            </Typography>
                            <Grid className={classes.inputLine}>
                                <AccountCircleIcon className={classes.icons}/>
                                <TextField
                                    id="username"
                                    label="username"
                                    variant="outlined"
                                    type={"username"}
                                    style={{width: '100%'}}
                                />
                            </Grid>
                            <Grid className={classes.inputLine}>
                                <VpnKeyIcon className={classes.icons}/>
                                <TextField
                                    id="password"
                                    label="password"
                                    variant="outlined"
                                    type={"password"}
                                    style={{width: '100%'}}
                                />
                            </Grid>
                            <Button
                                disableRipple
                                className={ classes.submitButton }
                                variant={ "outlined" }
                            >
                                Register
                            </Button>
                            <Typography className={classes.text}>
                                Already own an Account?
                            </Typography>
                            <Button
                                disableRipple
                                className={ classes.button }
                                onClick={ props.loginScreen }
                            >
                                LogIn
                            </Button>
                        </Grid>
                    }
                    {
                        props.login &&
                        <Grid item>
                            <Typography className={classes.secondary}>
                                Already own an Account?
                            </Typography>
                            <Typography
                                variant={'h4'}
                                className={classes.primary}
                            >
                                LogIn Now:
                            </Typography>
                            <Grid className={classes.inputLine}>
                                <AccountCircleIcon className={classes.icons}/>
                                <TextField
                                    id="username"
                                    label="username"
                                    variant="outlined"
                                    type={"username"}
                                    style={{width: '100%'}}
                                />
                            </Grid>
                            <Grid className={classes.inputLine}>
                                <VpnKeyIcon className={classes.icons}/>
                                <TextField
                                    id="password"
                                    label="password"
                                    variant="outlined"
                                    type={"password"}
                                    style={{width: '100%'}}
                                />
                            </Grid>
                            <Button
                                disableRipple
                                className={ classes.submitButton }
                                variant={ "outlined" }
                            >
                                LogIn
                            </Button>
                            <Typography className={classes.text}>
                                Don't have an Account?
                            </Typography>
                            <Button
                                disableRipple
                                className={ classes.button }
                                onClick={ props.loginScreen }
                            >
                                Register
                            </Button>
                        </Grid>
                    }
                </Box>
            </Container>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    login: state.login.value
});

const mapDispatchToProps = {
    loginScreen: loginScreen,
};

Index.getInitialProps = async ({ store }) => {}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
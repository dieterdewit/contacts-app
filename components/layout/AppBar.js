import React from 'react';
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Link from "../Link";
import theme from '../../src/theme';
import CustomMenu from "./CustomMenu";
import CustomizedTabs from "./CustomTabs";

const useStyles = makeStyles(theme => ({
    toolBar: {
        backgroundColor: theme.palette.background.default,
        opacity: 0.97
    },
    Title: {
        height: 60,
        width: 400,
        alignContent: 'center'
    },
}));

export default function AppHeader() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar elevation={0} id="appBar">
                <Toolbar className={ classes.toolBar }>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                    >
                        <Hidden mdUp>
                            <Grid
                                item
                                xs={8}
                            >
                                <Grid
                                    container
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Grid
                                        container
                                        component={ Link }
                                        naked
                                        href="/"
                                        className={ classes.title }
                                        style={{ color: theme.palette.primary.main, }}
                                    >
                                        <Typography
                                            variant='h4'
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            CONTACTS.APP
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                xs={4}
                            >
                                <Grid
                                    container
                                    justify="flex-end"
                                >
                                    <CustomMenu />
                                </Grid>
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <CustomizedTabs />
                        </Hidden>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid style={{ height: '65px' }}/>
        </React.Fragment>
    );
}

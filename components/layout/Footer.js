import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles(theme => ({
    FooterGrid: {
        backgroundColor: theme.palette.text.main,
    },
    Divider: {
        backgroundColor: theme.palette.primary.main,
        height: 5,
        marginBottom: 30,
    },
    FColors: {
        color: theme.palette.background.default,
        '&:hover': {
            color: theme.palette.secondary.main
        }
    },
    FLink: {
        color: theme.palette.background.default,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    Margins: {
        marginTop: 15,
        marginBottom: 25
    }
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid
                container
                className={ classes.FooterGrid }
                justify="center"
            >
                <Grid
                    item
                    xs={12}
                    className={ classes.Divider }
                />
                <Grid item xs={4}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                    >
                        <a
                            href="https://github.com/kamiryu-sama/contacts-app#readme"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GitHubIcon className={ classes.FColors } fontSize="large"/>
                        </a>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        className={ classes.Margins }
                    >
                        <Typography
                            style={{ color: 'whitesmoke' }}
                            variant="body1"
                            noWrap
                        >
                            Dieter E. de Wit Torres
                        </Typography>
                        <Grid item style={{ marginRight: 10}}/>
                        <Typography
                            style={{ color: 'whitesmoke' }}
                            variant="body1"
                            noWrap
                        >
                            |
                        </Typography>
                        <Grid item style={{ marginRight: 10}}/>
                        <a
                            href={`mailto:dieterdewit@gmail.com`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={ classes.FLink }
                        >
                            dieterdewit@gmail.com
                        </a>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

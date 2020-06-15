import React, { Component } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Link from "../Link";
import theme from '../../src/theme';

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        height: 3,
        '& > div': {
            maxWidth: 60,
            width: '100%',
            backgroundColor: theme.palette.primary.main,
        },
    },
})(props =>
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <div /> }}
    />);

const StyledTab = withStyles(theme => ({
    root: {
        textTransform: 'none',
        color: theme.palette.text.main,
        marginBottom: 9,
        padding: '0 30px',
        fontWeight: 'bold',
        marginRight: '5%',
        opacity: 1,
        '&:hover': {
            opacity: 0.8
        }
    },
}))(props =>
    <Tab
        disableRipple
        {...props}
    />);


export default class CustomizedTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: -1
        };
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    }

    logoClick = () => {
        this.setState({ value: -1 })
    }

    render () {
        return (
            <React.Fragment>
                <Grid
                    container
                    component={ Link }
                    naked
                    href="/"
                    style={{ height: 60, width: 400, color: theme.palette.primary.main }}
                    onClick={ this.logoClick }
                >
                    <Typography
                        style={{ fontWeight: 'bold' }}
                        variant='h3'
                    >
                        CONTACTS APP
                    </Typography>
                </Grid>
                <Typography
                    component="span"
                    style={{ marginLeft: '8%' }}
                >
                    <StyledTabs
                        value={ this.state.value }
                        onChange={ this.handleChange }
                        aria-label="menuTabs"
                    >
                        <StyledTab
                            label="Contacts Book"
                            component={ Link }
                            naked
                            href="/Contacts"
                            style={{ fontSize: 20 }}
                        />
                        <StyledTab
                            label="Documentation"
                            component={ Link }
                            naked
                            href="/Documentation"
                            style={{ fontSize: 20 }}
                        />
                    </StyledTabs>
                </Typography>
            </React.Fragment>
        )
    }
}

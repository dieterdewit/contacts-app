import React, { Component } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import {connect} from 'react-redux';
import { resetTabs, pageOneTab, pageTwoTab } from '../../redux/actions/tabsActions';
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


class CustomizedTabs extends Component {
    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
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
                    onClick={ this.props.resetTabs }
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
                        value={ this.props.selected }
                        aria-label="menuTabs"
                    >
                        <StyledTab
                            label="Contacts Book"
                            component={ Link }
                            naked
                            href="/Contacts"
                            style={{ fontSize: 20 }}
                            onClick={ this.props.pageOneTabs }
                        />
                        <StyledTab
                            label="Dashboard"
                            component={ Link }
                            naked
                            href="/Dashboard"
                            style={{ fontSize: 20 }}
                            onClick={ this.props.pageTwoTabs }
                        />
                    </StyledTabs>
                </Typography>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    selected: state.selected.value
});

const mapDispatchToProps = {
    pageOneTabs: pageOneTab,
    pageTwoTabs: pageTwoTab,
    resetTabs: resetTabs,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedTabs);
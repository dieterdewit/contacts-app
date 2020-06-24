import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Link from "../Link";
import { logout } from "../../redux/actions/loginActions";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    MenuIcon: {
        fontSize: theme.typography.pxToRem(30),
        color: theme.palette.primary.main,
    }
}));

function CustomMenu(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);

    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <React.Fragment>
            <IconButton
                aria-label="Menu"
                aria-controls="long-menu"
                aria-haspopup="true"
                ref={anchorRef}
                onClick={ handleToggle }
            >
                <MenuRoundedIcon className={ classes.MenuIcon }/>
            </IconButton>
            {props.isAuthenticated && (
            <Popper
                open={ open }
                anchorEl={ anchorRef.current }
                transition
                disablePortal
            >
                {({
                      TransitionProps,
                      placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={ handleClose }>
                                <MenuList
                                    autoFocusItem={ open }
                                    id="menu-list-grow"
                                    onKeyDown={ handleListKeyDown }
                                >
                                    <MenuItem
                                        onClick={ handleClose }
                                        component={ Link }
                                        naked
                                        href="/Add"
                                    >
                                        Add Contact
                                    </MenuItem>
                                    <MenuItem
                                        onClick={ props.logout }
                                    >
                                        LogOut
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
            )}
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: !!state.logged.logged.token
});

const mapDispatchToProps = {
    logout: logout
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomMenu);
import React, { useState } from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles"; 
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grow from '@material-ui/core/Grow';
import { withRouter } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    root: { 
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        cursor: "default",
        fontSize: '1.5rem'
    },
    appBar: {
        backgroundColor: '#191919',
        width: '100%',
        height: '65px', 
    },
    tabItems: {
        height: '65px',
    },
    tabItem: {
        height: '65px',
        textTransform: 'none',
    },
    logInButton: {
        position: "absolute",
        top: '100px',
        right: '100px',
    },
    menyBackG: {
        position: 'fixed',
        width: '100%',
        height: '100vh', 
        top: '60px', 
        backgroundColor: '#302e2e',
        zIndex: '2000',
    },
    typographyMovies: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        fontSize: '7rem',
        color: '#202020',
        cursor: 'default',
        fontWeight: 'bold',
    },
    buttonGrup: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
    },
    buttonGrupButton: {
        padding: '30px 150px',
        color: '#f2f2f2',
        fontWeight: 'bold',
    },
}));


const Header = props => {
    const { history } = props
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const [menyOpen, setmenyOpen] = useState(false)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Cinema +
                    </Typography>
                    <Hidden only={'xs'}>
                        <Hidden only={'sm'}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                className={classes.tabItems}
                            >
                                <Tab
                                    label="Home"
                                    className={classes.tabItem}
                                    onClick={() => { history.push('/') }} />
                                <Tab
                                    label="Now Showing"
                                    className={classes.tabItem}
                                    onClick={() => { history.push('/nowShowing') }} />
                                <Tab
                                    label="Coming Soon"
                                    className={classes.tabItem}
                                    onClick={() => { history.push('/comingSoon') }} />
                                <Tab
                                    label="Cinemas"
                                    className={classes.tabItem}
                                    onClick={() => { history.push('/cinemas') }} />
                            </Tabs>
                        </Hidden>
                    </Hidden>
                    <IconButton
                        color="inherit"
                        onClick={() => { history.push('/logIn') }}
                    >
                        <AccountCircleOutlinedIcon />
                    </IconButton>
                    <Hidden mdUp>
                        <IconButton
                            color="inherit"
                            onClick={() => { setmenyOpen(!menyOpen) }} >
                            <MenuOutlinedIcon />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
            {menyOpen && !matches ?
                <Grow
                    in={menyOpen}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(menyOpen ? { timeout: 1000 } : {})}>
                    <div className={classes.menyBackG}>
                        <Typography className={classes.typographyMovies}>
                            Movies
                    </Typography>
                        <ButtonGroup
                            orientation="vertical"
                            color='inherit'
                            aria-label="vertical contained primary button group"
                            variant="text"
                            className={classes.buttonGrup}
                        >
                            <Button
                                className={classes.buttonGrupButton}
                                onClick={() => {
                                    history.push('/')
                                    setmenyOpen(!menyOpen)
                                }}>
                                Home
                        </Button>
                            <Button
                                className={classes.buttonGrupButton}
                                onClick={() => {
                                    history.push('/nowShowing')
                                    setmenyOpen(!menyOpen)
                                }}>
                                Now Showing
                        </Button>
                            <Button
                                className={classes.buttonGrupButton}
                                onClick={() => {
                                    history.push('/comingSoon')
                                    setmenyOpen(!menyOpen)
                                }}>
                                Coming Soon
                        </Button>
                            <Button
                                className={classes.buttonGrupButton}
                                onClick={() => {
                                    history.push('/cinemas')
                                    setmenyOpen(!menyOpen)
                                }}>
                                Cinemas
                        </Button>
                        </ButtonGroup>
                    </div>
                </Grow> : null}
        </div>
    )
}

export default withRouter(Header);
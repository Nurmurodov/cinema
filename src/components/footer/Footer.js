import React from 'react'
import { makeStyles } from "@material-ui/core/styles" 

const useStyles = makeStyles((theme) => ({
    footerCont: {
        borderTop: '2px solid white',
        margin: '30px 15px 10px 15px',
    },
    footerP: {
        margin: 0,
        margin: '0 15px 5px 15px',
        fontSize: '0.8rem',
        color: 'white',
    },
    footerA: {
        margin: 0,
        margin: '0 15px 5px 15px',
        fontSize: '0.8rem',
        color: 'white', 
    },
    footerAa: {
        textDecoration: 'none',
    }
}))
function Footer() {
    const classes = useStyles()
    return (
        <>
            <div className={classes.footerCont}></div>
            <p className={classes.footerP}>© Nurmurodov Bahrom.2020</p>
            <div className={classes.footerA}> 
                <span>Crafted with love | </span>
                <a 
                href="#"
                className={classes.footerAa}>Nurmurodov Bahrom</a>
            </div> 
        </>
    )
}

export default Footer

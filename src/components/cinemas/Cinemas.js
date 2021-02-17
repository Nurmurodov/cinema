import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import CardElement from './CardElement';


const useStyles = makeStyles(() => ({
    OurCinemaTitle: {
        color: 'white',
        fontSize: '3rem',
        fontWeight: '200',
        marginTop: '90px',
    },
    gridContainer: {
        width: '100vw',
        marginTop: '20px',
        paddingLeft: "40px",
        paddingRight: "40px"
      }
}))

function Cinemas() {
    const classes = useStyles();
    return (
        <div>
            <Typography variant='body2' align='center' className={classes.OurCinemaTitle}>
                Our Cinemas
            </Typography>
            <Grid
                container
                spacing={4}
                className={classes.gridContainer}
                justify="center"
            >
                <Grid item xs={12} sm={6} md={4}>
                    <CardElement />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardElement />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardElement />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardElement />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardElement />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardElement />
                </Grid>
            </Grid>
        </div>
    )
}

export default Cinemas

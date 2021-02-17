import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    movieCont: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
        top: '60px',
        left: 0,
        zIndex: '1000',
    },
    movieTitle: {
        position: 'absolute',
        color: 'white',
        top: '40px',
        left: '30px',
        zIndex: '1001'
    },
    movieRating: {
        position: 'absolute',
        color: 'white',
        top: '100px',
        left: '30px',
        zIndex: '1001'
    },
    movieAbout: {
        position: 'absolute',
        color: 'white',
        top: '170px',
        left: '30px',
        zIndex: '1001',
        width: '30vw',
    },
    movieButton: {
        position: 'absolute',
        color: 'white',
        bottom: '90px',
        right: '30px',
        color: 'black', 
        padding: '20px',
        zIndex: '1001',
    }
}))
function Movie({ movieData }) {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.movieCont}>
                <CardMedia
                    component="img"
                    alt={movieData.title}
                    height="100%"
                    image={movieData.backPoster}
                    title="Contemplative Reptile"
                />
                <Typography className={classes.movieTitle} variant='h2'>
                    {movieData.title} 
                </Typography>
                <Typography className={classes.movieRating} variant='h4'>{movieData.rating} </Typography>
                <Typography className={classes.movieAbout} variant='p'>{movieData.overview}</Typography>
                <Button variant="contained"  className={classes.movieButton} >
                    Buy Ticket
                </Button>
            </div>
        </div>
    )
}

export default Movie

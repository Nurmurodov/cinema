import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Gif from './img/404Eror.gif'

const useStyles = makeStyles(() => ({
    pageNotFoundCont: {
        width: '100%',
        height: '74vh',
    }
}))

function PageNotFound() {
    const classes = useStyles();
    return (
        <div className={classes.pageNotFoundCont}>
            <CardMedia
                component="img"
                alt='Archive'
                height="100%"
                image={Gif}
                title="Contemplative Reptile"
            />
        </div>
    )
}

export default PageNotFound

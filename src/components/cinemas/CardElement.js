import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea'; 
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import EventSeatRoundedIcon from '@material-ui/icons/EventSeatRounded';

const useStyles = makeStyles({
    root: {
        minWidth: 180,
        backgroundColor: '#2d2d2d',
        boxShadow: '0 0 10px 5px rgba(0,0,0,0.4)',
    },
    cinemaName: {
        marginTop: '20px',
        fontSize: '1.2rem',
        color: 'white',
    },
    cinemaSubtitle: { 
        fontSize: '0.7rem',
        color: '#9a9a9a',
        marginBottom: '40px',
    },
    cinemaCount: { 
        fontSize: '0.9rem',
        color: '#9a9a9a',
    },
    cinemaCountIcon : {
        transform: 'translateY(6px)'
    }
});

function CardElement() {
    const classes = useStyles();
     
    return (
        <Card className={classes.root} variant="outlined">
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="200"
                    image="https://img-assets.drafthouse.com/images/venues/yonkers/yonkers2.jpg?auto=compress&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=1080&q=80&w=1920"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography variant='body1' className={classes.cinemaName}>
                        Pallini Cinema
                    </Typography>
                    <Typography variant='body1' className={classes.cinemaSubtitle}>
                        Pallini
                    </Typography>
                    <Typography variant='body1' className={classes.cinemaCount}>
                         <AttachMoneyRoundedIcon className={classes.cinemaCountIcon} /><span>7 € per movie</span> 
                    </Typography>
                    <Typography variant='body1' className={classes.cinemaCount}>
                         <EventSeatRoundedIcon className={classes.cinemaCountIcon} /><span>50 seats Available</span> 
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CardElement
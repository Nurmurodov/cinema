import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import Button from '@material-ui/core/Button';
import Movie from '../Movie/Movie'

const apiKey = 'a4999a28333d1147dbac0d104526337a';
const url = 'https://api.themoviedb.org/3';
const nowPlayingUrl = `${url}/movie/now_playing`;




const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: '20px auto',
        maxWidth: '65vw',
        height: '280px',
        backgroundColor: '#0d0d0c',
        color: '#f3f3f3',
        boxShadow: "0 0 10px 4px rgba(0,0,0,0.6)",
        cursor: 'pointer',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '65%',
        overflow: 'auto',
        boxShadow: "0 0 20px 40px rgba(0,0,0,0.6)",
    },
    content: {
        overflow: 'auto',
    },
    cover: {
        width: '35vw',
    },
    infoClass: {
        overflow: 'auto',
    },
    TypComingSoon: {
        margin: '80px 0 20px 0',
        color: 'white',
    },
    paginationClass: {
        display: 'inline-block',
        alignItems: 'center',
    },
    circularProgMovie: {
        position: 'relative',
        top: '20px',
        left: '50%',
        color: 'white',
        marginBottom: '20px',
        transform: 'translateX(-50%)',
    },
    movieButton: {
        position: 'absolute',
        color: 'white',
        bottom: '30px',
        left: '30px',
        padding: '10px',
        zIndex: '1001',
    }
}));

function NowShowing() {
    const classes = useStyles();
    const [nowPlaying, setNowPlaying] = useState([]);
    const [loading, setloading] = useState(false);
    const [Error, seterror] = useState(false)
    const [page, setPage] = useState(1);
    const [moviePage, setmoviePage] = useState(undefined);

    const handleChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    };

    const MoviePageChange = (page - 1) * 5 + moviePage;

    const fetchMovies = async () => {
        try {
            const { data } = await axios.get(nowPlayingUrl, {
                params: {
                    api_key: apiKey,
                    language: 'en_US',
                    page: 1
                }
            })

            const posterUrl = 'https://image.tmdb.org/t/p/original/';
            const modifiedData = data['results'].map((m) => ({
                id: m['id'],
                backPoster: posterUrl + m['backdrop_path'],
                popularity: m['popularith'],
                title: m['title'],
                poster: posterUrl + m['poster_path'],
                overview: m['overview'],
                rating: m['vote_average'],
                loading: true,
            }))

            setloading(!loading)

            return modifiedData;
        } catch (error) {
            seterror(!Error)
        }
    }

    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
        };

        fetchAPI();
    }, []);
    return (
        <div>
            <Typography
                variant="h3"
                align='center'
                color='textPrimary'
                className={classes.TypComingSoon}>
                Now Showing
            </Typography>
            {Error ? <Typography
                variant="h6"
                align='center'
                color='textPrimary'
                className={classes.TypComingSoon}>
                Ups, You are offline!
            </Typography> :
                loading ?
                    nowPlaying[moviePage] ? <>
                        <Movie movieData={nowPlaying[MoviePageChange]} />
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.movieButton}
                            onClick={() => { setmoviePage(undefined) }} >
                            <ArrowBackSharpIcon />
                        </Button>
                    </> :
                        nowPlaying.slice((page - 1) * 5, page * 5).map((item, index) => {
                            return (
                                <Card
                                    className={classes.root}
                                    key={index}
                                    onClick={() => { setmoviePage(index) }}>
                                    <CardActionArea className={classes.details}>
                                        <CardContent className={classes.content}>
                                            <Typography component="h5" variant="h5">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="subtitle1" color='initial'>
                                                {item.rating}
                                            </Typography>
                                            <Typography variant="body2" color="initial" component="p" className={classes.infoClass}>
                                                {item.overview}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardMedia
                                        className={classes.cover}
                                        image={item.backPoster}
                                        alt={item.title}
                                        title="Live from space album cover"
                                    />
                                </Card>
                            )
                        }) :
                    <CircularProgress className={classes.circularProgMovie} />
            }
            <div className={classes.paginationClass}>
                <Pagination
                    count={4}
                    page={page}
                    onChange={handleChange}
                    color="secondary"
                    variant="outlined"
                />
            </div>
        </div>
    )
}

export default NowShowing

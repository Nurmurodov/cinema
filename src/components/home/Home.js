import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Slider from "react-slick";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import Typography from '@material-ui/core/Typography';
import Movie from '../Movie/Movie'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router-dom';

const apiKey = 'a4999a28333d1147dbac0d104526337a';
const url = 'https://api.themoviedb.org/3';
const topratedUrl = `${url}/movie/top_rated`;
const nowPlayingUrl = `${url}/movie/now_playing`;

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        margin: '30px 40px',
        backgroundColor: '#1a1a1a',
        maxWidth: '30vw',
        color: '#f3f3f3',
        cursor: 'pointer',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        paddingBottom: '10px',
    },
    sliderClass: {
        width: '93.5vw',
    },
    cover: {
        display: 'flex',
        width: '100%',
    },
    MovieTitle: {
        marginTop: "10px",
        width: '90%',
    },
    movieCont: {
        width: '100%',
        height: '100vh',
    },
    movieTitle: {
        position: 'absolute',
        color: 'white',
        top: '100px',
        left: '30px',
    },
    movieRating: {
        position: 'absolute',
        color: 'white',
        top: '160px',
        left: '30px',
    },
    movieAbout: {
        position: 'absolute',
        color: 'white',
        top: '230px',
        left: '30px',
        width: '30vw',
    },
    movieButton: {
        position: 'absolute',
        color: 'white',
        bottom: '30px',
        right: '30px',
        padding: '20px',
    },
    sliderName: {
        margin: '20px auto 10px 20px',
        color: 'white',
        fontSize: '2rem',
    },
    movieButtons: {
        position: 'absolute',
        color: 'white',
        bottom: '30px',
        left: '30px',
        padding: '10px',
        zIndex: '1001',
    }
}));
function Home(props) {
    const { history } = props;
    const [topRated, setTopRated] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [movieOpen, setmovieOpen] = useState(undefined);
    const [movieOpenTop, setmovieOpenTop] = useState(undefined);
    const classes = useStyles();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const fetchTopratedMovie = async () => {
        try {
            const { data } = await axios.get(topratedUrl, {
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
            }))
            return modifiedData;
        } catch (error) {
        }
    }

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
            return modifiedData;
        } catch (error) {
        }
    }


    useEffect(() => {
        const fetchAPI = async () => {
            setTopRated(await fetchTopratedMovie());
            setNowPlaying(await fetchMovies());
        };

        fetchAPI();
    }, []);
    return (
        <>
            {nowPlaying[movieOpen] ?
                <>
                    <Movie movieData={nowPlaying[movieOpen]} />
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.movieButtons}
                        onClick={() => { setmovieOpen(undefined) }} >
                        <ArrowBackSharpIcon />
                    </Button>
                </> :
                topRated[movieOpenTop] ?
                    <>
                        <Movie movieData={topRated[movieOpenTop]} />
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.movieButtons}
                            onClick={() => { setmovieOpenTop(undefined) }} >
                            <ArrowBackSharpIcon />
                        </Button>
                    </> :
                    <>
                        <div>
                            <div className={classes.movieCont}>
                                <CardMedia
                                    component="img"
                                    alt='Archive'
                                    height="100%"
                                    image="https://image.tmdb.org/t/p/original//u9YEh2xVAPVTKoaMNlB5tH6pXkm.jpg"
                                    title="Contemplative Reptile"
                                />
                                <Typography className={classes.movieTitle} variant='h2'>
                                    Archive
                                </Typography>
                                <Typography className={classes.movieRating} variant='h4'>6.6</Typography>
                                <Typography className={classes.movieAbout} variant='body1'>
                                    2038: George Almore is working on a true human-equivalent AI, and his latest prototype is almost ready. This sensitive phase is also the riskiest as he has a goal that must be hidden at all costs—being reunited with his dead wife.
                                </Typography>
                                <Button variant='outlined'  className={classes.movieButton} >
                                    Learn more
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Typography variant='h2' className={classes.sliderName}>
                                Now Showing
                                <Button
                                    color="primary"
                                    onClick={() => { history.push('/nowShowing') }}>
                                    Explore All
                                </Button>
                            </Typography>
                        </div>
                        <Slider {...settings} className={classes.sliderClass}>
                            {nowPlaying.slice(0, 5).map((item, index) => {
                                return (
                                    <Card className={classes.root} key={index} onClick={() => { setmovieOpen(index) }}>
                                        <CardActionArea className={classes.details}>
                                            <CardMedia
                                                component="img"
                                                alt={item.title}
                                                image={item.backPoster}
                                                title="Contemplative Reptile"
                                                className={classes.cover}
                                            />
                                            <Typography
                                                className={classes.MovieTitle}>
                                                {item.title}
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                )
                            })}
                        </Slider>
                        <div>
                            <Typography variant='h2' className={classes.sliderName}>
                                Coming Soon
                                <Button
                                    color="primary"
                                    onClick={() => { history.push('/comingSoon') }}>
                                    Explore All
                                </Button>
                            </Typography>
                        </div>
                        <Slider {...settings} className={classes.sliderClass}>
                            {topRated.slice(0, 5).map((item, index) => {
                                return (
                                    <Card className={classes.root} key={index} onClick={() => { setmovieOpenTop(index) }}>
                                        <CardActionArea className={classes.details}>
                                            <CardMedia
                                                component="img"
                                                alt={item.title}
                                                image={item.backPoster}
                                                title="Contemplative Reptile"
                                                className={classes.cover}
                                            />
                                            <Typography
                                                className={classes.MovieTitle}>
                                                {item.title}
                                            </Typography>
                                        </CardActionArea>
                                    </Card>
                                )
                            })}
                        </Slider>
                    </>}
        </>
    )
}

export default withRouter(Home)

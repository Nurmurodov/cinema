
import React from "react"
import { Route, Switch, Router } from "react-router-dom";

import Home from "./components/home/Home";
import Header from "./components/header/Header";
import NowShowing from "./components/nowShowing/NowShowing";
import ComingSoon from "./components/comingSoon/ComingSoon";
import Cinemas from "./components/cinemas/Cinemas";
import LogIn from './components/logPages/LogIn'
import LogUp from './components/logPages/LogUp'
import Footer from "./components/footer/Footer";
import PageNotFound from './components/PageNotFound/PageNotFound'
  
export default function App() {

  return (
    <div>
      <Header />
      <Switch>
        <Route exact from="/" render={props => <Home {...props} />} />
        <Route exact path="/nowShowing" render={props => <NowShowing {...props} />} />
        <Route exact path="/comingSoon" render={props => <ComingSoon {...props} />} />
        <Route exact path="/cinemas" render={props => <Cinemas {...props} />} />
        <Route exact path="/logIn" render={props => <LogIn {...props} />} />
        <Route exact path="/logUp" render={props => <LogUp {...props} />} />  
        <Route exact render={props => <PageNotFound {...props} />} />
      </Switch>
      <Footer />
    </div>
  );
}


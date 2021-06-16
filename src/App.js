import React from 'react';
import Header from './components/header';
import About from './components/about';
import Contact from './components/contact';
import Help from './components/help';
import Login from './components/loginPage';
//import Welcome from './components/welcome';
import CreateUser from './components/createUser';
import DashBoardTopNavBar from './components/dashBoardTopNavBar';
import LeftSideNavBar from './components/inbound/leftSideNavBar';
import Orders from './components/inbound/orders';
import CreateOrder from './components/inbound/createOrder';
import {useSelector} from 'react-redux';
import {viewsSelector} from './store/reducer/viewsControlSlice';
import {topNavBarViewsSelector} from './store/reducer/topNavBarViewsControl';
import SideNav from './components/SideNav';
import OrderDetails from './components/inbound/orderDetails';
//import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

document.body.style.backgroundColor = "white";

const useStyles = makeStyles((theme) => ({
  appSimple: {
  },
  app: {
    display: "flex",
    background: "white",
  },
}));
function App() {
  const classes = useStyles();

  const view = useSelector(viewsSelector);
  const viewFromTopNavBar = useSelector(topNavBarViewsSelector);

  console.log(view);
  console.log(viewFromTopNavBar);


  if(view === "about"){
    return(
      <div className={classes.appSimple}>
          <Header/>
          <About/>
      </div>
    )
  } else if(view === "login"){
    return (
      <div className={classes.appSimple}>
        <Header/>
        <Login/>
      </div>
    );
  } else if(view === "contact"){
    return (
      <div className={classes.appSimple}>
        <Header/>
        <Contact/>
      </div>
    );
  } else if(view === "help"){
    return (
      <div className={classes.appSimple}>
        <Header/>
        <Help/>
      </div>
    );
  } else if(view === "createAcc"){
    return (
      <div className={classes.appSimple}>
        <Header/>
        <CreateUser/>
      </div>
    )
  } else if(view === "welcome"){
    //check condition after login, for inbound, outbound ... tabs
      if(viewFromTopNavBar === ""){
        return (
          <div className={classes.app}>
            <CssBaseline/>
            <DashBoardTopNavBar/>
            <LeftSideNavBar/>
          </div>
        ) 
      } else if (viewFromTopNavBar === "inbound"){
        return (
          <div className={classes.app}>
            <CssBaseline/>
            <DashBoardTopNavBar/>
            <SideNav/>
            <Orders/>
          </div>
        ) 
      } else if(viewFromTopNavBar === "createOrder"){
        return (
          <div className={classes.app}>
            <CssBaseline/>
            <DashBoardTopNavBar/>
            <SideNav/>
            <CreateOrder/>
          </div>
        ) 
      } else if(viewFromTopNavBar === "orderDetails"){
        return (
          <div className={classes.app}>
            <CssBaseline/>
            <DashBoardTopNavBar/>
            <SideNav/>
            <OrderDetails/>
          </div>
        ) 
      }  else {
        return (
          <div className={classes.app}>
            <CssBaseline/>
            <DashBoardTopNavBar/>
            <LeftSideNavBar/>
          </div>
        ) 
      }
      //end of check condition after login, for inbound outbound ... tabs
  }   
}

export default App;
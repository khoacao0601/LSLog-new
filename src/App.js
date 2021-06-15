import React from 'react';
import Header from './components/header';
import About from './components/about';
import Contact from './components/contact';
import Help from './components/help';
import Login from './components/loginPage';
//import Welcome from './components/welcome';
import CreateUser from './components/createUser';
import DashBoardTopNavBar from './components/dashBoardTopNavBar';
import LeftSideNavBar from './components/leftSideNavBar';
import Orders from './components/inbound/orders';
import CreateOrder from './components/inbound/createOrder';
import {useSelector} from 'react-redux';
import {viewsSelector} from './store/reducer/viewsControlSlice';
import {topNavBarViewsSelector} from './store/reducer/topNavBarViewsControl';
//import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

function App() {

  const view = useSelector(viewsSelector);
  const viewFromTopNavBar = useSelector(topNavBarViewsSelector);

  console.log(view);
  console.log(viewFromTopNavBar);


  if(view === "about"){
    return(
      <div className="App">
          <Header/>
          <About/>
      </div>
    )
  } else if(view === "login"){
    return (
      <div className="App">
        <Header/>
        <Login/>
      </div>
    );
  } else if(view === "contact"){
    return (
      <div className="App">
        <Header/>
        <Contact/>
      </div>
    );
  } else if(view === "help"){
    return (
      <div className="App">
        <Header/>
        <Help/>
      </div>
    );
  } else if(view === "createAcc"){
    return (
      <div className="App">
        <Header/>
        <CreateUser/>
      </div>
    )
  } else if(view === "welcome"){
    //check condition fater login, for inbound outbound ... tabs
      if(viewFromTopNavBar === ""){
        return (
          <div className="App">
            <DashBoardTopNavBar/>
            <LeftSideNavBar/>
          </div>
        ) 
      } else if (viewFromTopNavBar === "inbound"){
        return (
          <div className="App">
            <DashBoardTopNavBar/>
            <Orders/>
            <LeftSideNavBar/>
          </div>
        ) 
      } else if(viewFromTopNavBar === "createOrder"){
        return (
          <div className="App">
            <DashBoardTopNavBar/>
            <CreateOrder/>
            <LeftSideNavBar/>
          </div>
        ) 
      } else {
        return (
          <div className="App">
            <DashBoardTopNavBar/>
            <LeftSideNavBar/>
          </div>
        ) 
      }
      //end of check condition fater login, for inbound outbound ... tabs
  }
   
}

export default App;
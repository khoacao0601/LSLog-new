import React from 'react';
import Header from './components/header';
import About from './components/about';
import Contact from './components/contact';
import Help from './components/help';
import Login from './components/loginPage';
import Welcome from './components/welcome';
import CreateUser from './components/createUser';
import {useSelector} from 'react-redux';
import {viewsSelector} from './store/reducer/viewsControlSlice';
//import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

function App() {
  const view = useSelector(viewsSelector);


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
  } else if(view === "welcome"){
    return (
      <div className="App">
        <Header/>
        <Welcome/>
      </div>
    )
  } else if(view === "createAcc"){
    return (
      <div className="App">
        <CreateUser/>
      </div>
    )
  }
   
}

export default App;

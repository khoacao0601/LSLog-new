import React from 'react';
import Header from './components/header';
import About from './components/about';
import Contact from './components/contact';
import Help from './components/help';
import Login from './components/loginPage';
import {useSelector} from 'react-redux';
import {viewsSelector} from './store/reducer/viewsControlSlice';

function App() {
  const view = useSelector(viewsSelector);

  if(view === "about"){
    return(
      <div className="App">
        <Header/>
        <About/>
      </div>
    )
  } else if(view === "home"){
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
      </div>
    )
  }

}

export default App;

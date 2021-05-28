import React from 'react';
import Header from './components/header';
import About from './components/about';
import Contact from './components/contact';
import Help from './components/help';
import Login from './components/loginPage';
import Welcome from './components/welcome';
import {useSelector} from 'react-redux';
import {viewsSelector} from './store/reducer/viewsControlSlice';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

function App() {
  const view = useSelector(viewsSelector);

  console.log(view);

  const isAuthenticated = !!view;

  console.log(isAuthenticated);

  const PrivateRoute = ({component: Component, ...rest}) => {
  return(
      <Route {...rest} component={(props) => (
        isAuthenticated
          ? <Component {...props}/>
          : <Redirect to='/Login'/>
      )}/>
   )
  }

  return(
    <Router>
      <Header/>
        <Switch>
          <Route exact path='/Login' component={Login}/>
          <Route path='/About' component={About}/>
          <Route path='/Contact' component={Contact}/>
          <Route path='/Help' component={Help}/>
          <PrivateRoute exact path='/Welcome' component={Welcome}/>
        </Switch>
    </Router>
  )

}

export default App;

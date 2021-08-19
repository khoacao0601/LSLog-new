import React, {Fragment} from 'react';
import Header from './components/header';
import About from './components/about';
import Contact from './components/contact';
import Help from './components/help';
import Login from './components/loginPage';
//import Welcome from './components/welcome';
//import CreateUser from './components/createUser';
//import Account from './components/welcome';
import DashBoardTopNavBar from './components/dashBoardTopNavBar';
//import LeftSideNavBar from './components/inbound/leftSideNavBar';
import Orders from './components/inbound/orders';
import CreateOrder from './components/inbound/createOrder';
import {useSelector} from 'react-redux';
import {viewsSelector} from './store/reducer/viewsControlSlice';
//import {topNavBarViewsSelector} from './store/reducer/topNavBarViewsControl';
import SideNav from './components/SideNav';
import OrderDetails from './components/inbound/orderDetails';
//import Dashboard from './components/dashboard';
import Inventory from './components/inventory/inventory';
import Outbound from './components/outbound/outbound';
import { makeStyles } from '@material-ui/core/styles';
//import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import './styling/app.css';
import UnplannedPicks from './components/outbound/unplanned-picks';
import SideNavOutbound from './components/outbound/SideNavOB';
import PlannedPicks from './components/outbound/planned-picks';
import PlannedWaves from './components/outbound/planned-waves';
import DetailPlannedWaves from './components/outbound/detail-planned';
import Complete from './components/outbound/complete';

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

  const userStatus = localStorage.getItem("value");

  const viewValue = useSelector(viewsSelector);

  console.log(viewValue);

  console.log(userStatus);

  const PrivateRoute = ({comp: Component, ...rest}) => {
    return(
        <Route {...rest} render={(props) => (
          userStatus
            ? <Component {...props}/>
            : <Redirect to='/'/>
        )}/>
     )
    }

    const Inbound = () => {
      return(
          <Switch>
            <Fragment>
              <DashBoardTopNavBar/>
              <SideNav/>
              <Orders/>
            </Fragment>
          </Switch>
      )
    }

    const InboundOrderDetails = () => {
      return( 
        <Fragment>
          <DashBoardTopNavBar/>
          <SideNav/>
          <OrderDetails/>
        </Fragment>
      )
    }

    const InboundCreateOrder = () => {
      return(
      <Fragment>
          <DashBoardTopNavBar/>
          <SideNav/>
          <CreateOrder/>
        </Fragment>
      )
    }

    const InventoryComponent = () => {
      return(
        <Fragment>
          <DashBoardTopNavBar/>
          <Inventory/>
        </Fragment>
      )
    }

    const OutBoundComponent = () => {
      return(
        <Fragment>
          <DashBoardTopNavBar/>
          <SideNavOutbound/>
          <Outbound/>
        </Fragment>
      )
    }
    const UnplannedPicksComponent = () => {
      return(
        <Fragment>
          <DashBoardTopNavBar/>
          <SideNavOutbound />
          <UnplannedPicks/>
        </Fragment>
      )
    }
    const PlannedPicksComponent = () => {
      return(
        <Fragment>
          <DashBoardTopNavBar/>
          <SideNavOutbound />
          <PlannedPicks />
        </Fragment>
      )
    }
    const PlannedWavesComponent = () => {
      return(
        <Fragment>
          <DashBoardTopNavBar/>
          <SideNavOutbound />
          <PlannedWaves />
        </Fragment>
      )
    }
    const DetailPlannedComponent = () => {
      return(
        <Fragment>
          <DashBoardTopNavBar/>
          <SideNavOutbound />
          <DetailPlannedWaves />
        </Fragment>
      )
    }
    const OutBoundComplete = () => {
      return(
        <Fragment>
          <DashBoardTopNavBar/>
          <SideNavOutbound />
          <Complete/>
        </Fragment>
      )
    }

  return(
    <Router>
      <Switch>
        {/* <PrivateRoute exact path="/Welcome" comp={DashBoardTopNavBar}/>   */}
        <PrivateRoute exact path="/Welcome" comp={DashBoardTopNavBar}/>  
        <PrivateRoute exact path='/Inbound/Orders' comp={Inbound}/>
        <PrivateRoute exact path='/Inbound/OrderDetails' comp={InboundOrderDetails} />
        <PrivateRoute exact path='/Inbound/CreateOrder' comp={InboundCreateOrder} />
        <PrivateRoute exact path='/Outbound/unplanned-fulfillment' comp={UnplannedPicksComponent} />
        <PrivateRoute exact path='/Outbound/planned-fulfillment' comp={PlannedPicksComponent} />
        <PrivateRoute exact path='/Outbound/planned-waves' comp={PlannedWavesComponent} />
        <PrivateRoute exact path='/Outbound/planned-detail' comp={DetailPlannedComponent} />
        <PrivateRoute exact path='/Outbound/complete' comp={OutBoundComplete} />
        <PrivateRoute exact path='/Inventory' comp={InventoryComponent}/>
        <PrivateRoute exact path='/Outbound' comp={OutBoundComponent}/>
          
        <Fragment className={classes.app}>  
          <Header/>
          <Route exact path='/' component={Login}/>
          <Route exact path='/About' component={About}/>
          <Route exact path='/Contact' component={Contact}/>
          <Route exact path='/Help' component={Help}/>
        </Fragment>
      </Switch>        
    </Router>
 )  
}



export default App;
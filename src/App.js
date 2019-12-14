import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Component/SidebarContents/Dashboard';
import Create from './Component/SidebarContents/Create';
import View from './Component/SidebarContents/View';
import Notification from './Component/SidebarContents/Notification';
import About from './Component/SidebarContents/About';
import Setting from './Component/SidebarContents/Settings/Setting';
import Login from './HomePage/Login';
import Register from './HomePage/RegisterPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return ( 
    <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Create" component={Create} />
            <Route exact path="/View" component={View} />
            <Route exact path="/Notification" component={Notification} />
            <Route exact path="/About" component={About} />
            <Route exact path="/Setting" component={Setting} />
           
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
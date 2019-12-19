import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Upload from './Component/SidebarContents/Upload';
import View from './Component/SidebarContents/View';
import Edit from './Component/SidebarContents/Edit'
import Login from './Component/HomeComponent/Login';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return ( 
    <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/Login" component={Login} />
            <Route exact path="/" component={Upload} />
            <Route exact path="/View" component={View} />
            <Route exact path="/Edit" component={Edit} />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
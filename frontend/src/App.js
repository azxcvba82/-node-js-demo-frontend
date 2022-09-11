import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import React from "react";
import {
  Dashboard,
  Login,
  Signup,
  Verify,
  Remail,
  Userprofile,
  Changepassword,
  Notfound
} from "./components";
import {
    environment
  } from "./environment";
import axios from 'axios';
import Cookies from 'universal-cookie';

function App() {
  // interceptors start
  axios.interceptors.request.use(
      request =>{
          const cookies = new Cookies();
        if(request.url.startsWith(environment.production.apiEndpoint + '/users/')===true){
          request.headers.common.Authorization = `Bearer ${cookies.get('token')}`
        }
        return request;
      },
      error =>{
        return Promise.reject(error)
      }
    );
  // interceptors end
      
    

  return (
    <html>
    <body>
    <div >
                      <Switch>
                          <Route exact path="/">
                              <Login />
                          </Route>
                          <Route exact path="/signup">
                              <Signup />
                          </Route>
                          <Route exact path="/verify">
                              <Verify />
                          </Route>
                          <Route exact path="/dashboard">
                              <Dashboard />
                          </Route>
                          <Route exact path="/userprofile">
                              <Userprofile />
                          </Route>
                          <Route exact path="/changepassword">
                              <Changepassword />
                          </Route>
                          <Route path="/remail">
                              <Remail />
                          </Route>
                          <Route path="*">
                              <Notfound />
                          </Route>
                      </Switch>
    </div>
    </body>
    </html>
  );
}

export default App;

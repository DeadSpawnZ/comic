import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Users from './components/Users';
import Comics from './components/Comics';
import Title from './components/Title';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import C404 from './components/404';
import axios from 'axios';
import { PrivateRoute, PublicRoute } from './routes/helperRoutes';

axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  async componentDidMount() {
    //const res = await axios.get('http://localhost:4000/users/myuser');
  }

  render() {
    return (
      <Router>
        <Switch>
          <PublicRoute exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/comics" component={Comics} />
          <PrivateRoute exact path="/users" component={Users} />
          <PrivateRoute path="/titles/:id" component={Title} />
          <Route exact path="/404" component={C404} />
          <Redirect path="/**" to="/404" />
        </Switch>
      </Router>
    );
  }
}

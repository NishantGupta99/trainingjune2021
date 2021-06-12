import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header'
import About from './components/About';
import UserForm from './components/userForm';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
   <Router>
    <Header></Header>
      <Switch>
        <Route exact path="/" component={UserForm} />
        <Route path="/about" component={About} />
        
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);



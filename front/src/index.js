import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from'./components/Login';
import Profile from './components/Profile';
import AllProfiles from './components/AllProfiles';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

ReactDOM.render(
<BrowserRouter>
<App>
<Switch>
<Route exact path="/" component = {Login}/>
<Route path="/profile/:id" component = {Profile}/>
<Route path="/profiles" component = {AllProfiles}/>
</Switch>
</App>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

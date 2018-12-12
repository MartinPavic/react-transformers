import React from 'react';
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';
import HomePage from './HomePage';
import Properties from './Properties';
import AddNew from './AddNew';
import Error from './components/Error';
import './App.css';

export default class App extends React.Component {
 render(){
   return(
    <BrowserRouter>
      <div>
          <nav className="navbar">
              <p className="navbar-brand"><NavLink to="/">Home</NavLink> </p>
          </nav>

          <Switch>
            <Route path="/" component={HomePage} exact/>
            <Route path="/transformer/" component={Properties} />
            <Route path="/addnew" component={AddNew} />
            <Route component={Error} />
          </Switch>
      </div>
    
    </BrowserRouter>

      
   );
  }
}
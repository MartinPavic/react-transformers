import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
import Transformers from './Transformers';
import './stylesheets/home.scss';
import './stylesheets/helper.scss';
import './stylesheets/properties.scss';
import {Button} from 'react-bootstrap';


export default class Home extends Component {
  state = {
    search: ''
  }

  updateSearch(event){
    this.setState({search: event.target.value.substr(0, 20)})
  }
	
  render() {
    return (
      <div className="container">
        <div id="home">

          <div className="row">
            <div className="col-md-12">
              <input className="form-control" type="text" id="searchbar" placeholder="Search" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 m-t-20">
              <Transformers search={this.state.search} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <Button bsStyle="secondary">
                <NavLink to="/addnew">Add new transformer</NavLink>
              </Button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
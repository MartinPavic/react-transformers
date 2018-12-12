import React, { Component } from "react";
import Transformer from './Transformer';
import api from "./api";
export default class Properties extends Component {
  state = {
    properties: [],
  };

componentDidMount(){
    api.get('http://localhost:3000/transformers')
    .then((res) => {
        this.setState({properties: res.data})
    });
}

  render() {
    return (
      <div id="properties">
        <div>
          {this.state.properties.map(transformer => {
            if(window.location.href.endsWith(`/transformer/${transformer.id}`)){
              return <Transformer transformer={transformer} key={transformer.id}/>
            } else {
              return null;
            }
          }
            
            
          )}
            
        </div>
      
      </div>
    );
  }
}
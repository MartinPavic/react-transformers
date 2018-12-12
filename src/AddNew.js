import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
import {Button, ButtonToolbar, DropdownButton, MenuItem, ToggleButton, ToggleButtonGroup, ButtonGroup} from 'react-bootstrap';
import API from './api';
import './stylesheets/helper.scss';


export default class AddNew extends Component {
  state = {

    id: '',
    name:'',
    vehicleGroup: 'Vehicle Group',
    vehicleType: [],
    vehicleModel: [],
    gear: [],
    status: ''
  }

  updateName(event){
    this.setState({name: event.target.value.substr(0, 20)})
  }
  updateID(event){
    this.setState({id: event.target.value})
  }

  handleClick(event){
    this.setState({hidden: false});
  }
  
  handleChange(e) {
    this.setState({status: e});
  }

  render() {
    const transf = {
               
      id: parseInt(this.state.id),
      name: this.state.name, 
      vehicleGroup: this.state.vehicleGroup,
      vehicleType: this.state.vehicleType.toString(),
      vehicleModel: this.state.vehicleModel.toString(),
      gear: this.state.gear.toString().split(', '),
      status: this.state.status
      
    };
    return (
        <div className="container">
          <div id="addnew">
              <h3>Add new transformer</h3>
              <div className="row m-t-40">
                  <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="ID" value={this.state.id} onChange={this.updateID.bind(this)}/>
                  </div>

                  <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.updateName.bind(this)}/>
                  </div>
              </div>

              <div className="row m-t-20">
                  <div className="col-md-12">
                      <h4>Vehicle properties</h4>

                      <ButtonGroup>
                          <DropdownButton id="dropdown-basic" title = {this.state.vehicleGroup} className="m-r-10">
                             
                              <MenuItem eventKey="1" value='Air' onSelect={()=>this.setState({vehicleGroup: 'Air',
                                  vehicleType: ['Plane', 'Helicopter']})}>
                                  Air</MenuItem>
                              <MenuItem eventKey="2" value='Sea' onSelect={()=>this.setState({vehicleGroup: 'Sea'
                                  , vehicleType: ['Boat', 'Submarine']})} >Sea</MenuItem>
                              <MenuItem eventKey="3" value='Land' onSelect={()=>this.setState({vehicleGroup: 'Land',
                                  vehicleType: ['Car', 'Truck']})}>Land</MenuItem>
                          </DropdownButton>

                          <DropdownButton id="dropdown-basic" title = "Vehicle Type" className="m-r-10">
                              {this.state.vehicleType.map((vTip)=>
                                  <MenuItem eventKey={vTip.indexOf()} key={vTip}
                                            onSelect={()=>{
                                                if(vTip === 'Plane'){this.setState({vehicleType: ['Plane'], vehicleModel: ['F-22', 'Sukhoi', 'MiG']})}
                                                if(vTip === 'Helicopter'){this.setState({vehicleType: ['Helicopter'], vehicleModel: ['Apache', 'Kamov']})}
                                                if(vTip === 'Boat'){this.setState({vehicleType: ['Boat'], vehicleModel: ['Sailboat', 'Jetboat']})}
                                                if(vTip === 'Submarine'){this.setState({vehicleType: ['Submarine'], vehicleModel: ['Standard']})}
                                                if(vTip === 'Car'){this.setState({vehicleType: ['Car'], vehicleModel: ['Camaro', 'AMG GT R', 'Lamborghini']})}
                                                if(vTip === 'Truck'){this.setState({ vehicleType: ['Truck'],vehicleModel: ['Unimog', 'Western Star 5700']})}}
                                            }>{vTip}
                                  </MenuItem>
                                  
                              )}
                          </DropdownButton>

                          <DropdownButton id="dropdown-basic" title = "Vehicle Model" className="m-r-10">
                              {this.state.vehicleModel.map((vMod)=>
                                  <MenuItem eventKey={vMod.indexOf()} key={vMod}
                                            onSelect={()=> {
                                                if(vMod === 'F-22'){this.setState({vehicleModel: ['F-22']})}
                                                if(vMod === 'Sukhoi'){this.setState({vehicleModel: ['Sukhoi']})}
                                                if(vMod === 'MiG'){this.setState({vehicleModel: ['MiG']})}
                                                if(vMod === 'Apache'){this.setState({vehicleModel: ['Apache']})}
                                                if(vMod === 'Kamov'){this.setState({vehicleModel: ['Kamov']})}
                                                if(vMod === 'Sailboat'){this.setState({vehicleModel: ['Sailboat']})}
                                                if(vMod === 'Jetboat'){this.setState({vehicleModel: ['Jetboat']})}
                                                if(vMod === 'Standard'){this.setState({vehicleModel: ['Standard']})}
                                                if(vMod === 'Camaro'){this.setState({vehicleModel: ['Camaro']})}
                                                if(vMod === 'AMG GT R'){this.setState({vehicleModel: ['AMG GT R']})}
                                                if(vMod === 'Lamborghini'){this.setState({vehicleModel: ['Lamborghini']})}
                                                if(vMod === 'Unimog'){this.setState({vehicleModel: ['Unimog']})}
                                                if(vMod === 'Western Star 5700'){this.setState({vehicleModel: ['Western Star 5700']})}
                                            }
                                            }
                                  >{vMod}</MenuItem>
                              )}
                          </DropdownButton>
                      </ButtonGroup>
                  </div>
              </div>

                <div className="row m-t-20">
                    <div className="col-md-12">
                        <h4>Status:</h4>

                        <ButtonToolbar>
                            <ToggleButtonGroup type="radio" name="status" value={this.state.status} onChange={this.handleChange.bind(this)}>
                                <ToggleButton value={'OK'} >OK</ToggleButton>
                                <ToggleButton value={'INJURED'}>INJURED</ToggleButton>
                                <ToggleButton value={'MIA'}>MIA</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </div>
                </div>

              <div className="row m-t-20">
                  <div className="col-md-12">
                      <input type="text" placeholder="Gear" className="form-control" onChange={(e)=>this.setState({gear: e.target.value})}/>
                  </div>
              </div>

              <div className="row m-t-20">
                  <div className="col-md-4">
                      <Button bsStyle="secondary" onClick ={(e)=>{
                          API.post('http://localhost:3000/transformers', transf)
                              .then(res => {
                                  console.log(res.data)
                              }).catch(error =>{
                                  console.log(error)
                              }
                          );
                          alert("Transformer dodan u listu!");
                          window.location.reload();

                      } }><NavLink to ='/'>Save</NavLink></Button>
                  </div>
              </div>
          </div>
    </div>
    );
  }
}
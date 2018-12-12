import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Button, DropdownButton, MenuItem, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import api from './api';
import './stylesheets/helper.scss';

export default class Transformer extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.transformer.id,
            name: this.props.transformer.name,
            vehicleGroup: this.props.transformer.vehicleGroup,
            vehicleType: [this.props.transformer.vehicleType],
            vehicleModel: [this.props.transformer.vehicleModel],
            gear: this.props.transformer.gear,
            status: this.props.transformer.status 
        }
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
               <h3>Update transformer</h3>
               <div className="row m-t-40">
                   <div className="col-md-6">
                       <label htmlFor="">ID:</label>
                       <input type="text" className="form-control" value={this.state.id} onChange={(e)=> this.setState({id: e.target.value})}/>
                   </div>

                   <div className="col-md-6">
                       <label htmlFor="">Name:</label>
                       <input type="text" className="form-control" value={this.state.name} onChange={(e)=> this.setState({name: e.target.value})}/>
                   </div>
               </div>

               <div className="row m-t-20">
                   <div className="col-md-12">
                       <label htmlFor="">Vehicle:</label><br/>
                       <DropdownButton
                           id="dropdown-basic"
                           title = {this.state.vehicleGroup}
                           className="m-r-10">
                           <MenuItem eventKey="1" value='Air' onSelect={()=>this.setState({vehicleGroup: 'Air',
                               vehicleType: ['Plane', 'Helicopter']})}>
                               Air</MenuItem>
                           <MenuItem eventKey="2" value='Sea' onSelect={()=>this.setState({vehicleGroup: 'Sea'
                               , vehicleType: ['Boat', 'Submarine']})} >Sea</MenuItem>
                           <MenuItem eventKey="3" value='Land' onSelect={()=>this.setState({vehicleGroup: 'Land',
                               vehicleType: ['Car', 'Truck']})}>Land</MenuItem>
                       </DropdownButton>

                       <DropdownButton
                           id="dropdown-basic"
                           title = "Vehicle Type"
                           className="m-r-10">
                           {this.state.vehicleType.map((vTip)=>
                               <MenuItem eventKey={vTip.indexOf()} key={vTip}
                                         onSelect={()=>{
                                             if(vTip === 'Plane'){this.setState({vehicleType: ['Plane'], vehicleModel: ['F-22', 'Sukhoi', 'MiG']})}
                                             if(vTip === 'Helicopter'){this.setState({vehicleType: ['Helicopter'], vehicleModel: ['Apache', 'Kamov']})}
                                             if(vTip === 'Boat'){this.setState({vehicleType: ['Boat'], vehicleModel: ['Sailboat', 'Jetboat']})}
                                             if(vTip === 'Submarine'){this.setState({vehicleType: ['Submarine'], vehicleModel: ['Standard']})}
                                             if(vTip === 'Car'){this.setState({vehicleType: ['Car'], vehicleModel: ['Camaro', 'AMG GT R', 'Lamborghini']})}
                                             if(vTip === 'Truck'){this.setState({ vehicleType: ['Truck'],vehicleModel: ['Unimog', 'Western Star 5700']})}}
                                         }>{vTip}</MenuItem>
                           )}
                       </DropdownButton>

                       <DropdownButton
                           id="dropdown-basic"
                           title = "Vehicle Model"
                           className="m-r-10">
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
                   </div>
               </div>

               <div className="row m-t-20">
                   <div className="col-md-12">
                       <label htmlFor="">Gear</label>
                       <input type="text" className="form-control" value={this.state.gear} onChange={(e)=> this.setState({gear: e.target.value})}/>
                   </div>
               </div>

               <div className="row m-t-20">
                   <div className="col-md-12">
                       <label htmlFor="">Status</label><br/>
                       <ToggleButtonGroup type="radio" name="options" value={this.state.status}
                                          onChange={(e) => this.setState({status: e})}>
                           <ToggleButton value={'OK'}>OK</ToggleButton>
                           <ToggleButton value={'INJURED'} >INJURED</ToggleButton>
                           <ToggleButton value={'MIA'}>MIA</ToggleButton>
                       </ToggleButtonGroup>
                   </div>
               </div>

               <div className="row m-t-20">
                   <div className="col-md-12">
                       <Button onClick = {() =>{
                           api.patch(`http://localhost:3000/transformers/${this.state.id}`, transf).then(res=>
                               console.log(res.data)
                           ).catch(error=> console.log('Greška'))

                       } }>
                           <NavLink to = "/">
                               Save
                           </NavLink>
                       </Button>
                   </div>
               </div>
          </div>
       )
   }
}
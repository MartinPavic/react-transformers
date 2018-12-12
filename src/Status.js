import React from 'react';
import {ToggleButton, ToggleButtonGroup, Button} from 'react-bootstrap';
import api from './api';
import './stylesheets/helper.scss';

export default class ToggleButtonGroupControlled extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        id: this.props.transformer.id,
        name: this.props.transformer.name,
        vehicleGroup: this.props.transformer.vehicleGroup,
        vehicleType: this.props.transformer.vehicleType,
        vehicleModel: this.props.transformer.vehicleModel,
        gear: this.props.transformer.gear,
        status: this.props.transformer.status
      };
    }

    render() {
      const transf = {
        id: this.state.id,
        name: this.state.name,
        vehicleGroup: this.state.vehicleGroup,
        vehicleType: this.state.vehicleType,
        vehicleModel: this.state.vehicleModel,
        gear: this.state.gear,
        status: this.state.status
      }

      return (
        <div>
       <ToggleButtonGroup type="radio" name="options" className="m-r-10" value={this.state.status}
        onChange={(e) => this.setState({status: e})
        }>
                <ToggleButton value={'OK'}>OK</ToggleButton>
                <ToggleButton value={'INJURED'} >INJURED</ToggleButton>
                <ToggleButton value={'MIA'}>MIA</ToggleButton>
      </ToggleButtonGroup>
     <Button bsStyle="success" onClick={()=> api.patch(`http://localhost:3000/transformers/${transf.id}`, transf)
        .then(res=> console.log(res.data))
        .catch(err => console.log("Greška"))}>Save status</Button>
      </div>
    )
  }
}
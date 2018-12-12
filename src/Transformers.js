import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Table, Button} from 'react-bootstrap';
import Status from './Status';
import api from './api';
import * as FontAwesome from 'react-icons/fa'
import './stylesheets/home.scss';
import './stylesheets/helper.scss';


export default class Transformers extends Component {
    constructor(props){
        super(props);
        this.state = {
            transformers: [],
            search: ''
        }
    }

    componentDidMount(){
        api.get('http://localhost:3000/transformers')
        .then((res) => {
            this.setState({transformers: res.data})
            
        });
    }
    render() {
        let filteredTransformers = this.state.transformers.filter( 
            (transformer) => 
            { return transformer.name.toLowerCase().indexOf(this.props.search) !== -1; } 
        );
        return (
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredTransformers.map(transformer =>
                        <tr key={transformer.id}>
                            <td>{transformer.id}</td>
                            <td>
                                <NavLink to = {'/transformer/'+transformer.id}> {transformer.name} </NavLink>
                            </td>

                            <td>
                                <Status transformer = {transformer}/>
                            </td>

                            <td className="text-right">
                                <Button className="btn btn-danger" onClick = {() => {
                                        api.delete(`http://localhost:3000/transformers/${transformer.id}`)
                                            .then(res => {console.log(res.data); console.log("Obrisan")})
                                            .catch(err => console.log("Greška"));
                                        window.location.reload();
                                        }}>
                                    <FontAwesome.FaTrashAlt className="m-t-5" />
                                </Button>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}
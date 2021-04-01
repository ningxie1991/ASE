import React, { Component } from 'react';
import getAllListings from '../services/browseService';

class Listings extends Component{

    constructor() {
        super();
        this.state = {
            allListings: []
        };
    }

    async componentDidMount() {
        const allListings = await getAllListings();
        this.setState({ allListings: allListings });
    }

    render() {
        const renderListings = this.state.allListings.map(item => (
            <tr key={item.id} align= "left">
                <td><img src={item.picture_url} width="100px" height="100px" /></td>
                <td>{item.name}</td>
                <td>Neighbourhood: {item.neighbourhood}</td>
            </tr>
        ));

        return (
            <div>
                <table>{renderListings}</table>
            </div>
        );
    }
}

export default Listings;

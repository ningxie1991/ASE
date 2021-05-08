import React, { Component } from 'react';
import getListingsFromNeighbourhood from "../services/browseService";

class Home extends Component{

    constructor() {
        super();
        this.state = {
            allListings: []
        };
    }

    async componentDidMount() {
        const allListings = await getListingsFromNeighbourhood("Brunnenstr. Süd");
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

export default Home;

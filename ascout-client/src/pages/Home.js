import React, { Component } from 'react';
import getMessage from '../services/finderService';

class Home extends Component{

    constructor() {
        super();
        this.state = {
            message: ''
        };
    }

    async componentDidMount() {
        const message = await getMessage();
        this.setState({ message: message });
    }

    render() {
        return (
            <div>
                <p>{this.state.message}</p>
            </div>
        );
    }
}

export default Home;

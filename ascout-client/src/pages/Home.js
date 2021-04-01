import React, { Component } from 'react';
import getAllListings from '../services/browseService';
import SimpleMap from '../components/SimpleMap';
import '../App.css';
import MyGoogleMap from '../components/MyGoogleMap';

class Home extends Component{

    constructor() {
        super();
    }

    async componentDidMount() {
    }

    render() {
        return (
            <div className="main-wrapper">
                <MyGoogleMap />
            </div>
        );
    }
}

export default Home;

import React from 'react';
import './App.css';
import Home from './pages/Home';

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){

        return (
            <div className="App">
               <Home />
            </div>
        );
    }
}

import React from 'react';
import logo from './logo.svg';
import './App.css';
import FinderService from './services/FinderService.js';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    componentDidMount(){
        FinderService.getMessage().then(response => {
            this.setState({message: response.data})
        });
    }

    render(){

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>

                    <h1>{this.state.message}</h1>

                </header>
            </div>
        );
    }
}

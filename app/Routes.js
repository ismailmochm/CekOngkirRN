import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux'
import Home from './pages/Home'
import Details from './pages/Details'

export default class Routes extends Component {
render() {
    return (
        <Router>
            <Scene key="root" hideNavBar={true}>
                <Scene key="home" component={Home} initial={true}/>
                <Scene key="details" component={Details}/>
            </Scene>
        </Router>
    );
}
}
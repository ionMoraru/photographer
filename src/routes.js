import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import api from './api';

import Collection from './components/containers/Collection';
import Home from './components/containers/Home';

export default class Routes extends Component {
    state = {
        collections: []
    } 
    componentDidMount = async () => {
        try {
            const response = await api.images.getCollectionsName();
            this.setState({ collections: response.data.collections })
            
        } catch (error) {
            console.log('Get images error', error.stack);
        }
    }
    render() {
        const { collections } = this.state;
        return (
            <Switch>
                <Route exact path='/' component={Home}/>
                {collections.length > 0 && collections.map((item, i) => {
                    return <Route path={`/collections/${item.name}`} render={(props) => <Collection {...props} collectionName={item.name} />} key={i}/>
                })}
                
            </Switch>
        )
    }
}

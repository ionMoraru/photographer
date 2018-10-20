import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types'


import Collection from './containers/Collection';
import Home from './containers/Home';


const Routes = ({ collections }) => {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            {collections.length > 0 && collections.map((item, i) => {
                return <Route path={`/collections/${item.name}`} render={(props) => <Collection {...props} collectionName={item.name} />} key={i}/>
            })}
            
        </Switch>
    )
}

Routes.propTypes = {
    collections: PropTypes.array.isRequired
}

export default Routes;

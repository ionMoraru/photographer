import React, { Component } from 'react';

import LeftMenu from '../components/menu/LeftMenu';
import Routes from '../routes';

export default class Home extends Component {
     
  render() {
    return (
        <div>
            <LeftMenu />
            <Routes />
        </div>
    )
  }
}

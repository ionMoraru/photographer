import React, { Component } from 'react';

import Slider from '../components/slider/Slider';
import InitialLoader from '../components/loaders/InitialLoader';

export default class Home extends Component {
  state = {
    animate: false
  } 
  componentDidMount = async () => {
    this.timer = setTimeout(() => {
      this.setState({ animate: true })
    }, 4000);  
  }


  componentWillUnmount = () => {
    clearInterval(this.timer);
  }

  render() {
    const { animate } = this.state;

    return (
        <div>
          <InitialLoader animate={animate} />
          <Slider />
        </div>
    )
  }
}

import React, { Component } from 'react';
import SwiftSlider from 'react-swift-slider';

import api from '../../api';

import './Slider.css';

export default class Slider extends Component {
  state = {
    slides: [],
  };

  componentDidMount = async () => {
    try {
      const response = await api.images.getSliderImages();
      this.setState({ slides: response.data.nature });
    } catch (error) {
      console.log('Get images error', error.stack);
    }
  };

  render() {
    const { slides } = this.state;

    return (
      <div className="slider">
        <SwiftSlider data={slides} showDots={false} enableNextAndPrev={false} interval={6000} />
      </div>
    );
  }
}

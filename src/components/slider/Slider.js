import React, { Component } from 'react'
import PropTypes from 'prop-types';
import SwiftSlider from 'react-swift-slider';

import api from '../../api';

import './Slider.css'

export default class Slider extends Component {
  static propTypes = {
    prop: PropTypes
  }

  state = {
    slides: []
  } 

  componentDidMount = async () => {
      try {
          const response = await api.images.getSliderImages();
          this.setState({ slides: response.data.nature })
          
      } catch (error) {
          console.log('Get images error', error.stack);
      }
  }


  render() {
    const { slides } = this.state;
    return (
      <div className="slider">
       <SwiftSlider 
        data={slides}
        height='100vh'
        showDots={false}
        enableNextAndPrev={false}
        />
      </div>
    )
  }
}

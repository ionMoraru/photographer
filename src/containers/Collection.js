import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InitialLoader from '../components/loaders/InitialLoader';

import api from '../api';

import './Collection.css';

export default class App extends Component {
  static propTypes = {
    collectionName: PropTypes.string.isRequired,
  };

  state = {
    parallax: [],
    collectionName: this.props.collectionName,
    animate: false,
  };
  componentDidMount = async () => {
    const { collectionName } = this.state;
    const params = { collectionName };

    setTimeout(() => {
      this.timer = this.setState({ animate: true });
    }, 3000);

    try {
      const response = await api.images.getImages(params);
      this.setState({ parallax: response.data.nature });
    } catch (error) {
      console.log('Get images error', error.stack);
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  render() {
    const { parallax, animate } = this.state;

    return (
      <div>
        <InitialLoader animate={animate} />
        {parallax.length > 0 &&
          parallax.map(item => {
            return (
              <div className="slide-container" key={item.id}>
                <div
                  className="slide"
                  style={{
                    background: `url(${item.url}) no-repeat center`,
                    backgroundSize: 'contain',
                    backgroundAttachment: 'fixed',
                  }}
                />
              </div>
            );
          })}
      </div>
    );
  }
}

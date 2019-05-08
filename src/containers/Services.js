import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import InitialLoader from '../components/loaders/InitialLoader';
import ContactForm from '../components/forms/ContactForm';
import './Services.css';

export default class Services extends Component {
  state = {
    reserve: false,
    animate: false,
    isSmallScreen: false
  };

  onReserve = () => {
    this.setState({
      reserve: true,
    });
  };

  onCloseContact = () => {
    this.setState({
      reserve: false,
    });
  };
  componentDidMount = async () => {
    setTimeout(() => {
      this.timer = this.setState({ animate: true });
    }, 3000);

    // eslint-disable-next-line
    // eslint-disable-next-line
    const mediaQueries = screen.width;

    if (mediaQueries < 800) {
      this.setState({ isSmallScreen: true });
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  render() {
    const { reserve, animate, isSmallScreen } = this.state;
    return (
      <Fragment>
        <InitialLoader animate={animate} />

        <div className="services-container">
          <div
            className={classNames('s-container__price-pack', {
              'animate__price-pack': reserve,
              'fadeindown__price-pack': animate,
            })}
          >
            <div className="price-pack--header">
              <h1><FormattedMessage
              style={{ fontSize: '1.5rem'}}
                  id="services.basic5"
                  defaultMessage="La séance photo dure 1h30."
                /></h1>
              <span className="price">120 €</span>
            </div>
            <ul className="price-pack--body">
              <li>
                <FormattedMessage
                  id="services.basic1"
                  defaultMessage="La séance photo dure 1h30."
                />
              </li>
              <li>
                <FormattedMessage
                  id="services.basic4"
                  defaultMessage="Le lieu de la séance photo reste à votre choix."
                />
              </li>
              <li>
                <FormattedMessage
                  id="services.basic2"
                  defaultMessage="Entre 50 et 75 images traitées."
                />
              </li>
              <li>
                <FormattedMessage
                  id="services.basic3"
                  defaultMessage="Photos livrées en format digital pendant 4 semaines."
                />
              </li>
              
            </ul>
            <div className="price-pack--footer">
              <button onClick={this.onReserve}>
                <FormattedMessage id="services.reserve" defaultMessage="Réserver" />
              </button>
            </div>
          </div>
          
          <ContactForm isSmallScreen={isSmallScreen} animate={reserve} isService={true} onCloseContact={this.onCloseContact} />
        </div>
      </Fragment>
    );
  }
}

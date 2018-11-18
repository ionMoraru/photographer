import React, { Component, Fragment } from 'react'
import ContactForm from '../components/forms/ContactForm'
import classNames from 'classnames';
import './Services.scss';
import { FormattedMessage } from "react-intl";
import InitialLoader from "../components/loaders/InitialLoader";

export default class Services extends Component {

  state = {
    reserve: false,
    animate: false
  }

  onReserve = () => {
    this.setState({
      reserve: true
    })
  }

  onCloseContact = () => {
    this.setState({
      reserve: false,
    })
  }
  componentDidMount = async () => {
    setTimeout(() => {
      this.timer = this.setState({ animate: true });
    }, 3000);
  };


  componentWillUnmount = () => {
    clearInterval(this.timer);
  }

  render() {
    const { reserve, animate } = this.state;
    return (
      <Fragment>
        <InitialLoader animate={animate} />

        <div className="services-container">
          <div className={classNames("s-container__price-pack", {'animate__price-pack': reserve, 'fadeindown__price-pack': animate})}>
            <div className="price-pack--header">
              <h1>Basic</h1>
              <span className="price">75 €</span>
            </div>
            <ul className="price-pack--body">
              <li><FormattedMessage id="services.basic1" defaultMessage="La séance photo dure 30 minutes." /></li>
              <li><FormattedMessage id="services.basic2" defaultMessage="100 photos retouchées au total." /></li>
              <li><FormattedMessage id="services.basic3" defaultMessage="10 photos livrées le même jour." /></li>
              <li><FormattedMessage id="services.basic4" defaultMessage="Une photo aimantée pour votre frigo." /></li>
            </ul>
            <div className="price-pack--footer">
              <button onClick={this.onReserve}><FormattedMessage id="services.reserve" defaultMessage="Réserver" /></button>
            </div>
            
          </div>
          <ContactForm animate={reserve} isService={true} onCloseContact={this.onCloseContact}/>
        </div>
      </Fragment>
    )
  }
}

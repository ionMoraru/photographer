import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContactForm from '../components/forms/ContactForm'
import classNames from 'classnames';
import './Services.scss'

export default class Services extends Component {
//   static propTypes = {
//     prop: PropTypes
//   }

  state = {
    reserve: false
  }

  onReserve = () => {
    this.setState({
      reserve: true
    })
  }

  onCloseContact = () => {
    this.setState({
      reserve: false
    })
  }

  render() {
    const { reserve } = this.state;
    return (
      <div className="services-container">
        <div className={classNames("s-container__price-pack", {'animate__price-pack': reserve})}>
          <div className="price-pack--header">
            <h1>Basic</h1>
            <span className="price">75 €</span>
          </div>
          <ul className="price-pack--body">
            <li>Sedința foto durează 30 de minute.</li>
            <li>100 de poze redactate în total.</li>
            <li>10 poze livrate în aceeași zi.</li>
            <li>O poză magnet pentru frigiderul dvs.</li>
          </ul>
          <div className="price-pack--footer">
            <button onClick={this.onReserve}>Rezervă</button>
          </div>
          
        </div>
        <ContactForm animate={reserve} isService={true} onCloseContact={this.onCloseContact}/>
      </div>
    )
  }
}

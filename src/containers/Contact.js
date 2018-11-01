import React, { Component } from 'react';

import './Contact.scss';

import InitialLoader from "../components/loaders/InitialLoader";
import ContactForm from "../components/forms/ContactForm";
import { FormattedMessage } from "react-intl";

export default class Contact extends Component {
  state = {
    animate: false,
  }

  componentDidMount = () => {
    this.timer = setTimeout(() => {
      this.setState({ animate: true });
    }, 4000);
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  }

  render() {
      const { animate } = this.state;
    return (
        <div>
            <InitialLoader animate={animate} />
            <div className="contact-container">
            <div className="phone--container">
              <h1>Paris</h1>
              <div className="phone-block">
                <p><FormattedMessage id="contact.phone" defaultMessage="téléphone" /></p>
                <p><FormattedMessage id="contact.number" defaultMessage="+33 (7) 53 43 87 63" /></p>
              </div>
              <div className="email-block">
                <p><FormattedMessage id="contact.email.contact" defaultMessage="email" /></p>
                <p><FormattedMessage id="contact.email.adress" defaultMessage="ion.01panainte@gmail.com" /></p>
              </div>
            </div>
            <ContactForm animate={animate} />
            </div>
        </div>
    )
  }
}

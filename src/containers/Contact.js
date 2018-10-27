import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Contact.scss';

import InitialLoader from "../components/loaders/InitialLoader";
import ContactForm from "../components/forms/ContactForm";

export default class Contact extends Component {
  state = {
    animate: false
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 4000);
  };

  render() {
      const { animate } = this.state;
    return (
        <div>
            <InitialLoader animate={animate} />
            <div className="contact-container">
            <ContactForm />
            </div>
        </div>
    )
  }
}

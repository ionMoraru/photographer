import React, { Component } from "react";
import isEmail from 'validator/lib/isEmail';
import classNames from 'classnames';
import { FormattedMessage } from "react-intl";

import api from '../../api';

import "./ContactForm.scss";

export default class ContactForm extends Component {
  state = {
    message: {
      subject: "",
      email: "",
      body: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      message: { ...this.state.message, [e.target.name]: e.target.value }
    });

  onSubmit = async e => {
    e.preventDefault();
    const { message } = this.state;
    
    const errors = this.validate(message);

    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      
      try {
          const response = await api.contact.sendEmail(message);
          console.log(response);
          
          this.setState({ loading: false });
      } catch (error) {
          console.log(error.stack); 
          this.setState({ loading: false });
      }
    }
  };

  validate = data => {
    const errors = {};

    if (!isEmail(data.email)) errors.email = "error.email";
    if (!data.body || data.body.length > 10) errors.body = "error.body";

    return errors;
  };

  render() {
    const { message, errors, loading } = this.state;
    const { animate } = this.props;
    return (
      <div className={classNames("cc--form", { 'fadein-left': animate })}>
        <form onSubmit={this.onSubmit}>
          <h1><FormattedMessage id="contact.h1" defaultMessage="Comment puis-je vous aider ?" /></h1>
          <label htmlFor="subject"><FormattedMessage id="contact.subject" defaultMessage="Sujet" /></label>
          <input
            name="subject"
            type="text"
            maxLength="64"
            onChange={this.onChange}
            value={message.name}
          />
          <label htmlFor="email" required>
            <FormattedMessage id="contact.email" defaultMessage="Adresse email" />
          </label>
          <input
            className={classNames({ 'error': !!errors.email })}
            name="email"
            type="email"
            maxLength="64"
            onChange={this.onChange}
            value={message.email}
          />
          { !!errors.email && <span><FormattedMessage id={errors.email} defaultMessage="S'il vous plaît entrer une adresse email valide" /></span>}
          <label htmlFor="description"><FormattedMessage id="contact.body" defaultMessage="Votre demande" /></label>
          <textarea 
            className={classNames({ 'error': !!errors.body })}
            rows="6" 
            onChange={this.onChange}
            name="body"
            value={message.body}
          />
          { !!errors.body && <span><FormattedMessage id={errors.body} defaultMessage="S'il vous plaît entrer votre demande" /></span>}
          <button type="submit" disabled={loading} ><FormattedMessage id="contact.button" defaultMessage="Envoyer" /></button>
        </form>
      </div>
    );
  }
}

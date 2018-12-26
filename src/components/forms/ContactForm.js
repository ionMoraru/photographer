import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import api from '../../api';

import './ContactForm.css';

export default class ContactForm extends Component {
  state = {
    message: {
      subject: '',
      email: '',
      body: '',
    },
    loading: false,
    errors: {},
    feedback: '',
  };

  baseState = this.state.message;

  onChange = e =>
    this.setState({
      message: { ...this.state.message, [e.target.name]: e.target.value },
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
        const { data } = response.data;
        console.log(data);

        if (data !== undefined && data.sent === true) {
          this.setState({
            loading: false,
            message: this.baseState,
            feedback: 'feedback.success',
          });
        } else {
          this.setState({
            loading: false,
            message: this.baseState,
            feedback: 'feedback.error',
          });
        }
      } catch (error) {
        this.setState({
          loading: false,
          message: this.baseState,
          feedback: 'feedback.error',
        });
      }
    }
  };

  validate = data => {
    const errors = {};

    if (!isEmail(data.email)) errors.email = 'error.email';
    if (!data.body || data.body.length < 10) errors.body = 'error.body';

    return errors;
  };

  onCloseServiceRequest = () => {
    this.props.onCloseContact();
    this.setState({
      message: this.baseState,
    });
  };

  render() {
    const { message, errors, loading, feedback } = this.state;
    const { animate, hideContact, hidePhone, isService } = this.props;
    const showCloseIcon = !hidePhone || isService;

    return (
      <div className={classNames('cc--form', { 'fadein-left': animate, 'cc_mobile': animate, 'hide-contact': hideContact })}>
          <i style={{ display: showCloseIcon && 'none' }} className={classNames('contact-close material-icons', { 'cc_mobile--close': animate || hideContact })} onClick={this.onCloseServiceRequest}>
            close
          </i>

        <form onSubmit={this.onSubmit}>
          <ReactCSSTransitionGroup
            transitionName="feedback"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {feedback.length > 0 && (
              <span
                className={classNames('feedback-message', {
                  error: feedback === 'feedback.error',
                })}
              >
                <i className="lmenu--burger material-icons">
                  {feedback === 'feedback.error' ? 'close' : 'done'}
                </i>
                <FormattedMessage id={feedback} defaultMessage={feedback} />
              </span>
            )}
          </ReactCSSTransitionGroup>
          <h1>
            <FormattedMessage id="contact.h1" defaultMessage="Comment puis-je vous aider ?" />
          </h1>
          <label htmlFor="subject">
            <FormattedMessage id="contact.subject" defaultMessage="Sujet" />
          </label>
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
            className={classNames({ error: !!errors.email })}
            name="email"
            type="email"
            maxLength="64"
            onChange={this.onChange}
            value={message.email}
          />
          {!!errors.email && (
            <span>
              <FormattedMessage
                id={errors.email}
                defaultMessage="S'il vous plaît entrer une adresse email valide"
              />
            </span>
          )}
          <label htmlFor="description">
            <FormattedMessage id="contact.body" defaultMessage="Votre demande" />
          </label>
          <textarea
            className={classNames({ error: !!errors.body })}
            rows="6"
            onChange={this.onChange}
            name="body"
            value={message.body}
          />
          {!!errors.body && (
            <span>
              <FormattedMessage
                id={errors.body}
                defaultMessage="S'il vous plaît entrer votre demande"
              />
            </span>
          )}
          <button type="submit" disabled={loading}>
            <FormattedMessage id="contact.button" defaultMessage="Envoyer" />
          </button>
        </form>
      </div>
    );
  }
}

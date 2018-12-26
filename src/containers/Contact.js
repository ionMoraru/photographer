import React, { Component } from 'react';
import classNames from 'classnames';
import './Contact.css';

import InitialLoader from '../components/loaders/InitialLoader';
import ContactForm from '../components/forms/ContactForm';
import { FormattedMessage } from 'react-intl';

export default class Contact extends Component {
  state = {
    animate: false,
    hideContact: false,
    hidePhoneInfo: false,
    isSmallScreen: false
  };

  componentDidMount = () => {
    this.timer = setTimeout(() => {
      this.setState({ animate: true });
    }, 3000);
    
    // eslint-disable-next-line
    const mediaQueries = screen.width;

    if (mediaQueries < 750) {
      this.setState({ hideContact: true, isSmallScreen: true });
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  onClickContact = () => {
    this.setState({ hideContact: false, hidePhoneInfo: true });
  }
  onCloseContact = () => {
    this.setState({ hideContact: true, hidePhoneInfo: false });
  }

  render() {
    const { animate, hideContact, hidePhoneInfo, isSmallScreen } = this.state;
    return (
      <div>
        <InitialLoader animate={animate} />
        <div className="contact-container">
          <div className={classNames("phone--container", { 'mobile-hide': hidePhoneInfo })}>
            <h1>Paris</h1>
            <div className="phone-block">
              <p>
                <FormattedMessage id="contact.phone" defaultMessage="téléphone" />
              </p>
              <p>
                <FormattedMessage id="contact.number" defaultMessage="+33 (7) 53 43 87 63" />
              </p>
            </div>
            <div className="email-block">
              <p>
                <FormattedMessage id="contact.email.contact" defaultMessage="email" />
              </p>
              <p>
                <FormattedMessage
                  id="contact.email.adress"
                  defaultMessage="ion.01panainte@gmail.com"
                />
              </p>
            </div>
            <button className="mobile--contact" onClick={this.onClickContact} style={{ display: !hideContact && 'none'}}>
              Contact
            </button>
          </div>
          <ContactForm animate={animate} hideContact={hideContact} isSmallScreen={isSmallScreen} onCloseContact={this.onCloseContact} />
        </div>
      </div>
    );
  }
}

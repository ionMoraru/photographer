import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmail from 'validator/lib/isEmail';
import api from '../../api';

import "./ContactForm.scss";

export default class ContactForm extends Component {
  state = {
    message: {
      name: "",
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
    console.log(message);
    
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
      }
    //   this.props
    //     .submit(this.state.data)
    //     .catch(err =>
    //       this.setState({ errors: err.response.data.errors, loading: false })
    //     );
    }
  };

  validate = data => {
    const errors = {};

    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.body) errors.body = "Can't be blank";

    return errors;
  };

  render() {
    return (
      <div className="cc--form">
        <form onSubmit={this.onSubmit}>
          <label htmlFor="name">Votre nom</label>
          <input
            name="name"
            type="text"
            maxLength="64"
            onChange={this.onChange}
          />
          <label htmlFor="email" required>
            Votre adresse mail
          </label>
          <input
            name="email"
            type="email"
            maxLength="64"
            required
            onChange={this.onChange}
          />
          <label htmlFor="description">Votre description</label>
          <textarea 
            rows="4" 
            onChange={this.onChange}
            name="body" />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

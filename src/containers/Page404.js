import React, { Component, Fragment } from 'react'
import InitialLoader from '../components/loaders/InitialLoader';

import './Page404.scss';

export default class Page404 extends Component {
    state = {
      animate: false
    } 
    componentDidMount = async () => {
      this.timer = setTimeout(() => {
        this.setState({ animate: true })
      }, 3000);  
    }
  
  
    componentWillUnmount = () => {
      clearInterval(this.timer);
    }
  
    render() {
      const { animate } = this.state;
  
      return (
        <Fragment>
            <InitialLoader animate={animate} />
            <div className="p-404">
                <h1>Oups !</h1>
                <p>La page que vous recherchez semble introuvable.</p>
            </div>
        </Fragment>
      )
    }
  }
  

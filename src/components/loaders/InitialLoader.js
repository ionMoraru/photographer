import React from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import './InitialLoader.scss';



export default function InitialLoader({ animate }) {
  return (
    <div className={classNames({'animate': animate}, "initial-loader")}  >
        <Link to="/">
          <div className={classNames({'transitions': animate}, "logo")} ></div>
        </Link>
    </div>
  )
}

InitialLoader.propTypes = {
  animate: PropTypes.bool.isRequired
}
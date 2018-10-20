import React from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types'

import './InitialLoader.scss';

export default function InitialLoader({ animate }) {
  return (
    <div className={classNames({'animate': animate}, "initial-loader")}  >
        {/* <img id="logo" src="./slack.svg" alt="" height="200px" width="200px"> */}
    </div>
  )
}

InitialLoader.propTypes = {
  animate: PropTypes.bool.isRequired
}
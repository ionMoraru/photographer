import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { FormattedMessage } from "react-intl";
import { Link } from 'react-router-dom';

import './LeftMenu.scss'

export default class LeftMenu extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  state = {
      showLeftMenu: false,
      showSubmenu: false
  }

  onToogleLMenu = () => {
      this.setState({
          showLeftMenu: !this.state.showLeftMenu
      })
  }
  onToogleLSubmenu = () => {
      this.setState({
        showSubmenu: !this.state.showSubmenu
      })
  }

  render() {
    const { showLeftMenu, showSubmenu } = this.state;
    return (
      <nav className={classNames({ 'open': showLeftMenu }, "p-container__lmenu")}>
        <i
          className="lmenu--burger material-icons" 
          onClick={this.onToogleLMenu}>
          {!showLeftMenu ? 'menu': 'close'}
        </i>
        <ul className={classNames({ 'open': showLeftMenu }, "lmenu__items-container")}>
          <li onClick={this.onToogleLSubmenu}>
            <FormattedMessage 
              id="nav.collections"
              defaultMessage="Collections"/>
              <ul className={classNames({ 'open': showSubmenu }, "lmenu__submenu")}>
                <li><Link to=''>YEP</Link></li>
              </ul>
          </li>
          <li>
            <Link to=''>
              <FormattedMessage 
                id="nav.services"
                defaultMessage="Services"/>
            </Link>
          </li>
          <li>
            <Link to="">
              <FormattedMessage 
                id="nav.about"
                defaultMessage="À propos de moi"/>
            </Link>
          </li>
          <li>
            <Link to="">
              <FormattedMessage 
                id="nav.contact"
                defaultMessage="Contact"/>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

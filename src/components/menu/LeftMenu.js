import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { FormattedMessage } from "react-intl";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import './LeftMenu.scss'

class LeftMenu extends Component {
  static propTypes = {
    collections: PropTypes.array.isRequired,
    setLocale: PropTypes.func.isRequired,
    history: PropTypes.shape({
      listen: PropTypes.func.isRequired
    })
  };

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

  onChangeLang = (lang) => {
    this.props.setLocale(lang)
    }

  componentWillMount() {
    this.props.history.listen(() => {
      this.setState({ showLeftMenu: !this.state.showLeftMenu })
    });
  }

  render() {
    const { showLeftMenu, showSubmenu } = this.state;
    const { collections } = this.props;
    const submenu = collections.map((item, i) => {
      return <li key={i}><Link to={`/${item.path}`}>{item.name}</Link></li>
    });

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
                {submenu}
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
          <li style={{marginTop: "64px"}}>
            <span onClick={() => this.onChangeLang('fr')} style={{paddingRight: ".5vw"}}>fr</span><span>|</span>
            <span onClick={() => this.onChangeLang('ro')} style={{padding: "0 .5vw"}}>ro</span><span>|</span>
            <span onClick={() => this.onChangeLang('ru')} style={{paddingLeft: ".5vw"}}>ru</span>
          </li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(LeftMenu);

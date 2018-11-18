import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import "./LeftMenu.scss";

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
  };

  onToogleLMenu = () => {
    this.setState({
      showLeftMenu: !this.state.showLeftMenu
    });
  };
  onToogleLSubmenu = () => {
    this.setState({
      showSubmenu: !this.state.showSubmenu
    });
  };

  onChangeLang = lang => {
    this.props.setLocale(lang);
  };

  componentWillMount() {
    this.props.history.listen(() => {
      this.state.showLeftMenu && this.setState({ showLeftMenu: !this.state.showLeftMenu });
    });
  }

  handleBodyClick = (e) => {

    if(this.node.contains(e.target)) {
      return;
    }

    this.setState(prevState => ({
      showLeftMenu: false,
    }));

  }

  componentDidMount = () => {
    document.body.addEventListener('click', this.handleBodyClick);

    this.timer = setTimeout(() => {
      this.setState({ showLeftMenu: true });
    }, 1500);
    setTimeout(() => {
      this.setState({ showLeftMenu: false });
    }, 3000);
  }
  

  componentWillUnmount = () => {
    document.body.removeEventListener('click', this.handleBodyClick);
    clearInterval(this.timer);
  }

  render() {
    const { showLeftMenu, showSubmenu } = this.state;
    const { collections } = this.props;
    const submenu = collections.map((item, i) => {
      return (
        <li key={i}>
          <Link to={`/${item.path}`}>{item.name}</Link>
        </li>
      );
    });

    return (
      <nav className={classNames({ open: showLeftMenu }, "p-container__lmenu")} ref={node => { this.node = node; }} onClick={this.handleOutsideClick} >
        <i
          className="lmenu--burger material-icons"
          onClick={this.onToogleLMenu}
        >
          {!showLeftMenu ? "menu" : "close"}
        </i>
        <ul
          className={classNames(
            { open: showLeftMenu },
            "lmenu__items-container"
          )}
        >
          <li onClick={this.onToogleLSubmenu}>
            <FormattedMessage
              id="nav.collections"
              defaultMessage="Collections"
            />
            <ul className={classNames({ open: showSubmenu }, "lmenu__submenu")}>
              {submenu}
            </ul>
          </li>
          <li>
            <Link to="/services">
              <FormattedMessage id="nav.services" defaultMessage="Services" />
            </Link>
          </li>
          {/* <li>
            <Link to="">
              <FormattedMessage
                id="nav.about"
                defaultMessage="À propos de moi"
              />
            </Link>
          </li> */}
          <li>
            <Link to="/contact">
              <FormattedMessage id="nav.contact" defaultMessage="Contact" />
            </Link>
          </li>
          <li style={{ marginTop: "64px" }}>
            <span
              onClick={() => this.onChangeLang("fr")}
              style={{ paddingRight: 10 }}
            >
              fr
            </span>
            <span>|</span>
            <span
              onClick={() => this.onChangeLang("ro")}
              style={{ padding: "0 10px" }}
            >
              ro
            </span>
            <span>|</span>
            <span
              onClick={() => this.onChangeLang("ru")}
              style={{ paddingLeft: 10 }}
            >
              ru
            </span>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(LeftMenu);

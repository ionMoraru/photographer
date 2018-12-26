import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import { addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import ru from 'react-intl/locale-data/ru';
import ro from 'react-intl/locale-data/ro';

import api from '../api';
import messages from '../messages';

import LeftMenu from '../components/menu/LeftMenu';
import Routes from '../routes';

import './App.css';

addLocaleData(fr);
addLocaleData(ru);
addLocaleData(ro);

class App extends Component {
  state = {
    collections: [],
    lang: 'fr',
  };
  componentDidMount = async () => {
    let nLanguage = navigator.language.substring(0, 2);
    if (nLanguage !== 'fr' || nLanguage !== 'ro' || nLanguage !== 'ru') {
      this.setState({ lang: 'fr' });
    }

    try {
      const response = await api.images.getCollectionsName();
      this.setState({ collections: response.data.collections });
    } catch (error) {
      console.log('Get images error', error.stack);
    }
  };

  setLocale = lang => {
    if (lang !== undefined) {
      this.setState({ lang });
      localStorage.pLang = lang;
    }
  };

  render() {
    const { collections, lang } = this.state;
    const theDate = new Date().getFullYear();
    const locale = localStorage.pLang || lang;

    return (
      <IntlProvider locale={locale} messages={messages[locale]}>
        <div>
          <LeftMenu collections={collections} setLocale={this.setLocale} />
          <Routes collections={collections} />
          <footer>
            <p className="copyright">{`Copyright © ${theDate} Ion Panainte. All rights reserved.`}</p>
          </footer>
        </div>
      </IntlProvider>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { IntlProvider } from "react-intl";
import { addLocaleData } from "react-intl";
import fr from "react-intl/locale-data/fr";
import ru from "react-intl/locale-data/ru";
import ro from "react-intl/locale-data/ro";

import * as serviceWorker from './serviceWorker';

import App from './containers/App';
import messages from './messages';

import './index.css';


addLocaleData(fr);
addLocaleData(ru);
addLocaleData(ro);

let locale = navigator.language.substring(0, 2);
if (locale === 'en') {
    locale = 'fr'
}

ReactDOM.render(
    <IntlProvider locale={locale} messages={messages[locale]}>
        <Router>
            <App />
        </Router>
    </IntlProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
document.oncontextmenu = function() {
    return false;
}

// document.onkeydown = (event) => {
//     if (event.keyCode === 123) { // Prevent F12
//         return false;
//     } else if (event.ctrlKey && event.shiftKey && event.keyCode === 73) { // Prevent Ctrl+Shift+I        
//         return false;
//     }
// }
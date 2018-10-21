import React from 'react';
import ReactDOM from 'react-dom';
import { Router} from 'react-router-dom';
import history from './history';

import * as serviceWorker from './serviceWorker';

import App from './containers/App';

// import './index.scss';




ReactDOM.render(
        <Router history={history}>
            <App />
        </Router>, document.getElementById('root'));

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
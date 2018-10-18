import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { BrowserRouter as Router} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import './index.css';

ReactDOM.render(
    <Router>
        <Routes />
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
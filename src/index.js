import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();
const ArrRouter = (
    <Router history={history}>
        <App/>
    </Router>
);
ReactDOM.render(ArrRouter, document.getElementById('root'));
registerServiceWorker();

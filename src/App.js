import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import './App.css';

import createBrowserHistory from 'history/createBrowserHistory';
import {Switch, Route} from 'react-router-dom';
import reducer from './data/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { ConnectedRouter } from 'connected-react-router';
//initial store
const history = createBrowserHistory();
const initialState = {};
const store = createStore(
    connectRouter(history)(reducer), // new root reducer with router state
    initialState,
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history), // for dispatching history actions
            thunk
        ),
    ),
);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div className="App">
                        <Switch>
                            <Route exact path="/" component={Login}/>
                            <Route path="/chat" component={Chat}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/profile" component={Profile}/>
                        </Switch>
                    </div>
                </ConnectedRouter>
            </Provider>

        );
    }
}

export default App;

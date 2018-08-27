import React, {Component} from 'react';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import './App.css';
import { Switch, Route } from 'react-router-dom';
class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/chat" component={Chat}/>
                </Switch>
            </div>
        );
    }
}

export default App;

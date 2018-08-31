import React, {Component} from 'react';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import Register from './components/Register/Register';
import './App.css';
import { Switch, Route } from 'react-router-dom';
class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/chat" component={Chat}/>
                    <Route path="/register" component={Register}/>

                </Switch>
            </div>
        );
    }
}

export default App;

import React from 'react';
import './Login.css';
import axios from 'axios';
import InputLogin from '../InputLogin/InputLogin';

class Login extends React.Component {
    state = {
        login:'123',
        password:'123'
    };
    handleChange = (state)=>{
        this.setState({
            ...this.state,
            ...state
        })
    };
    handleStart = (e)=>{
        let self =this;
        const sendData= {
            login:this.state.login,
            password:this.state.password
        };
        axios.post('http://localhost:3030/auth',sendData)
            .then(function (response) {
                console.log(response);
                if(response.data !== ''){
                    sessionStorage.setItem('user', JSON.stringify(response.data));
                    self.props.history.push('/chat');
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    };
    render() {
        return (
            <div className="login__container">
                <div className="login__shape">
                    <div className="inside1"> </div>
                    <div className="inside2"> </div>
                </div>
                <div className="triangle"> </div>
                <InputLogin handleChange={this.handleChange}/>
                <div className="get-start" onClick={this.handleStart}>
                    <div className="get-start--caption">
                        <div>Get Started</div>
                    </div>
                    <div className="get-start--arrow"> </div>
                </div>
                <div className="footer">
                    <div className="footer__link">
                        <a href="#">Create Account</a>
                    </div>
                    <div className="footer__link--center"> </div>
                    <div className="footer__link">
                        <a href="#">Forgot Password</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
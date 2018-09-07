import React from 'react';
import './Login.css';
import axios from 'axios';
import InputLogin from '../InputLogin/InputLogin';
import jwt from 'jsonwebtoken';
import {connect} from 'react-redux';
import {userLogin} from '../../data/actions/action';

const secretOrKey = 'secret';

class Login extends React.Component {
    state = {
        login:'987',
        password:'987'
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
        axios.post('http://localhost:3030/api/auth',sendData)
            .then(function (response) {
                console.log(response);
                if(response.data !== ''){
                    sessionStorage.setItem('token',response.data.token);
                    const decoded = jwt.verify(response.data.token, secretOrKey);
                    sessionStorage.setItem('user', JSON.stringify(decoded));
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
                <div className="get-start" onClick={()=>this.props.login({
                    login:this.state.login,
                    password:this.state.password
                })}>
                    <div className="get-start--caption">
                        <div>Get Started</div>
                    </div>
                    <div className="get-start--arrow"> </div>
                </div>
                <div className="footer">
                    <div className="footer__link">
                        <a href="/register">Create Account</a>
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
// const  mapStateToProps = (state)=> {
//     return {};
// };
const mapDispatchToProps = (dispatch)=>{
    return {
        login: (user)=>{ dispatch(userLogin(user))}
    }
};
export default connect(null,mapDispatchToProps)(Login);
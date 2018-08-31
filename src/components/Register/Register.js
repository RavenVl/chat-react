import React, {Component} from 'react';
import InputRegister from '../InputRegister/InputRegister';
import './Register.css';
import axios from "axios";

class Register extends Component {
    state = {
        username:'123',
        login:'123',
        password:'123',
        confirm_password:'123'
    };
    handleSend = ()=>{
        let self =this;
        // {
        //     name: req.body.name,
        //         email: req.body.email,
        //     avatar: '',
        //     password: req.body.password
        // }
        const sendData= {
            name:this.state.username,
            email:this.state.login,
            password:this.state.password,
        };
        axios.post('http://localhost:3030/api/register',sendData)
            .then(function (response) {
                if(response.data !== ''){
                    sessionStorage.setItem('user', JSON.stringify(response.data));
                    self.props.history.push('/chat');
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    };
    handleChange = (state)=>{
        this.setState({
            ...this.state,
            ...state
        })
    };
    handleClickBack = () => {
        this.props.history.push('/');
    };
    render() {
        return (
            <div className="register__container">
                <div className="register__header">
                    <div className="register__header__back" onClick={this.handleClickBack}></div>
                    <div>
                        New Account
                    </div>
                    <div className="register__header__but"></div>
                </div>
                <div className="register__main">
                  <InputRegister handleChange={this.handleChange}/>
                </div>
                <div className="register__footer"  onClick={this.handleSend}>
                    <div className="get-start__register" >
                        <div className="get-start--caption">
                            <div>Register</div>
                        </div>
                    </div>
                    <div className="get-start--arrow"> </div>
                </div>
            </div>
        )
    }
}



export default Register;
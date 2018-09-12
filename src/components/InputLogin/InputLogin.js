import React from 'react';
import Input from '../Input/Input';
import './InputLogin.css';

class InputLogin extends React.Component {
    handleChange = (e, pole) => {
        this.props.handleChange({
            [pole]: e.currentTarget.value
        })
    };


    render() {
        return (
            <div>
                <div className="input__layout">
                    <Input
                        caption="Login"
                        classInput="input__img--user"
                        typeInput="text"
                        handleChange={this.handleChange}
                        pole="login"
                        val={this.props.user.login}

                    />
                    <Input
                        caption="password"
                        classInput="input__img--lock"
                        typeInput="password"
                        handleChange={this.handleChange}
                        pole="password"
                        val={this.props.user.password}


                    />
                </div>
            </div>


        )
    }
}

export default InputLogin;
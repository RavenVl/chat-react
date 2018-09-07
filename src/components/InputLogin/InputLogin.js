import React from 'react';
import './InputLogin.css';

class InputLogin extends React.Component {
    handleChange = (e, pole) => {
        this.props.handleChange({
            [pole]: e.currentTarget.value
        })
    };
    handleActive = (e) => {
        e.currentTarget.select();
    };

    render() {
        return (
            <div className="input__layout">
                <div className="input__container">
                    <div className="input__caption">USERNAME</div>
                    <div className="input__img--user"></div>
                    <input className="input__enter" type="text" defaultValue="987"
                           onChange={(e) => this.handleChange(e, 'login')}
                           onClick={this.handleActive}
                    />
                    <div className="input__line"></div>
                </div>

                <div className="input__container">
                    <div className="input__caption">password</div>
                    <div className="input__img--lock"></div>
                    <input className="input__enter" type="password" defaultValue="987"
                           onChange={(e) => this.handleChange(e, 'password')}
                           onClick={this.handleActive}
                    />
                    <div className="input__line"></div>
                </div>
            </div>
        )
    }
}

export default InputLogin;
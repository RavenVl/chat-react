import React, {Component} from 'react';
import './InputRegister.css';
class InputRegister extends Component {
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
                <div className="inputr__layout">
                    <div className="inputr__container">
                        <div className="inputr__caption">LOGIN</div>
                        <div className="inputr__img--user"></div>
                        <input className="inputr__enter" type="text" defaultValue="123"
                                onChange={(e) => this.handleChange(e, 'login')}
                                onClick={this.handleActive}
                        />
                        <div className="inputr__line"></div>
                    </div>
                    <div className="inputr__container">
                        <div className="inputr__caption">USERNAME</div>
                        <div className="inputr__img--user"></div>
                        <input className="inputr__enter" type="text" defaultValue="123"
                               onChange={(e) => this.handleChange(e, 'username')}
                               onClick={this.handleActive}
                        />
                        <div className="inputr__line"></div>
                    </div>
                    <div className="inputr__container">
                        <div className="inputr__caption">password</div>
                        <div className="inputr__img--lock"></div>
                        <input className="inputr__enter" type="password" defaultValue="123"
                               onChange={(e) => this.handleChange(e, 'password')}
                               onClick={this.handleActive}
                        />
                        <div className="inputr__line"> </div>
                    </div>
                    <div className="inputr__container">
                        <div className="inputr__caption">confirm password</div>
                        <div className="inputr__img--lock"></div>
                        <input className="inputr__enter" type="password" defaultValue="123"
                                onChange={(e) => this.handleChange(e, 'confirm_password')}
                                onClick={this.handleActive}
                        />
                        <div className="inputr__line"> </div>
                    </div>
                </div>
        );
    }
}

export default InputRegister;
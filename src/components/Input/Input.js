import React, {Component} from 'react';
import './Input.css';
class Input extends Component {
    handleActive = (e) => {
        e.currentTarget.select();
    };
    render() {
        return (

                <div className="input__container">
                    <div className="input__caption">{this.props.caption}</div>
                    <div className={this.props.classInput}></div>
                    <input className="input__enter" type={this.props.typeInput}
                           onChange={(e) => this.props.handleChange(e, this.props.pole)}
                           onClick={this.handleActive}
                           value={this.props.val}
                    />
                    <div className="input__line"> </div>
                </div>
        )

    }
}

export default Input;
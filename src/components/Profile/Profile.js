import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Profile.css';
import Input from "../Input/Input";
class Profile extends Component {
    handleClickBack = () => {
        this.props.history.push('/chat');
    };
    render() {
        return (
            <div>
                <div className="chat__container">
                    <div className="chat__header">
                        <div className="chat__header__back" onClick={this.handleClickBack}></div>
                        <div>
                          Edit Profile
                        </div>
                        <div className="chat__header__but" ></div>
                    </div>
                    <div className="input__layout--profile">
                        <Input
                            caption="Name"
                            classInput="input__img--user"
                            typeInput="text"
                            handleChange={this.handleChange}
                            pole="name"
                        />
                        <Input
                            caption="Description"
                            classInput="input__img--textedit"
                            typeInput="text"
                            handleChange={this.handleChange}
                            pole="description"
                        />
                        <Input
                            caption="VK"
                            classInput="input__img--vk"
                            typeInput="text"
                            handleChange={this.handleChange}
                            pole="vk"
                        />
                        <Input
                            caption="FB"
                            classInput="input__img--fb"
                            typeInput="text"
                            handleChange={this.handleChange}
                            pole="fb"
                        />
                        <Input
                            caption="Youtube"
                            classInput="input__img--yuotube"
                            typeInput="text"
                            handleChange={this.handleChange}
                            pole="youtube"
                        />
                    </div>
                    <div className="footer">

                        </div>
                    </div>
                </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
       user: state.user
    }
};
export default connect(mapStateToProps)(Profile);
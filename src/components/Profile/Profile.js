import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Profile.css';
import Input from '../Input/Input';
import axios from "axios";
import jwt from "jsonwebtoken";
import * as dataType from "../../data/actions/dataType";
import {push} from "connected-react-router";

class Profile extends Component {
    state = {
        name: '',
        description: '',
        vk: '',
        fb: '',
        youtube: ''
    };

    // static getDerivedStateFromProps(nextProps, prevState){
    //     return {
    //         name:nextProps.user.name,
    //         description : nextProps.profile.text,
    //         vk : nextProps.profile.vk,
    //         fb : nextProps.profile.fb,
    //         youtube : nextProps.profile.youtube
    //     };
    // }
    // componentWillReceiveProps(nextProps){
    //     this.setState(
    //         {
    //             name: nextProps.user.name,
    //             description: nextProps.profile.text,
    //             vk: nextProps.profile.vk,
    //             fb: nextProps.profile.fb,
    //             youtube: nextProps.profile.youtube
    //         }
    //     )
    // }
    componentDidMount(){
        this.setState(
            {
                name: this.props.user.name,
                description: this.props.profile.text,
                vk: this.props.profile.vk,
                fb: this.props.profile.fb,
                youtube: this.props.profile.youtube
            }
        )
    }
    handleChange = (e, state) => {
        console.log(e);
        this.setState({
            ...this.state,
            [state]: e.currentTarget.value
        })
    };
    handleClickBack = () => {
        this.props.history.push('/chat');
    };

    handleSave = ()=>{
        let self =this;
        const sendData= {
            text:this.state.description,
            youtube:this.state.youtube,
            vk:this.state.vk,
            fb:this.state.fb,
        };
        let token=sessionStorage.getItem('token');
        axios({
            method: 'post',
                url: 'http://localhost:3030/api/profile',
            headers:{
                'token':token
            },
            data: sendData
        })
            .then((response)=> {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    };



    render() {
        return (
            <div>
                <div className="chat__container">
                    <div className="chat__header">
                        <div className="chat__header__back" onClick={this.handleClickBack}></div>
                        <div>
                            {`Edit Profile  ${this.props.user.name}`}
                        </div>
                        <div className="chat__header__but"></div>
                    </div>
                    <div className="input__layout--profile">
                        <Input
                            caption="Name"
                            classInput="input__img--user"
                            typeInput="text"
                            handleChange={this.handleChange}
                            pole="name"
                            val={this.state.name}
                        />
                        <Input
                            caption="Description"
                            classInput="input__img--textedit"
                            typeInput="text"
                            handleChange={this.handleChange}
                            pole="description"
                            val={this.state.description}
                        />
                        <Input
                            caption="VK"
                            classInput="input__img--vk"
                            typeInput="text"
                            handleChange={this.handleChange}
                            pole="vk"
                            val={this.state.vk}
                        />
                        <Input
                            caption="FB"
                            classInput="input__img--fb"
                            typeInput="text"
                            handleChange={this.handleChange}
                            pole="fb"
                            val={this.state.fb}
                        />
                        <Input
                            caption="Youtube"
                            classInput="input__img--yuotube"
                            typeInput="text"
                            handleChange={this.handleChange}
                            pole="youtube"
                            val={this.state.youtube}
                        />
                    </div>
                    <div className="footer__profile">
                        <button
                            onClick={this.handleSave}
                            className="profile__send"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.chat.user,
        profile: state.profile.profile
    }
};
export default connect(mapStateToProps)(Profile);
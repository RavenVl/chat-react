import React from 'react';
import Message from '../Message/Message';
import './Chat.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {sendData, socetConect} from '../socetConect'
import {getProfile} from '../../data/actions/action';

class Chat extends React.Component {
    constructor() {
        super();
        socetConect(this.handleSocetReceive);
    }
    handleActive = (e) => {
        e.currentTarget.select();
    };
    handleClickBack = () => {
        this.props.history.push('/');
    };
    handleClick = (e) => {
        e.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('user'));
        let name = user.name;
        let message = this.state.message;
        sendData({name, message});
    };
    handleSocetReceive = (err, data) => {
        let newMessage = Array.from(this.state.messages);
        newMessage.push(data);
        this.setState({messages: newMessage});
    };
    handletClickProfile = ()=>{
        this.props.getProfile();
    };

    state = {
        message: 'Type message…',
        messages: []
    };
    handleChangeInput = (e) => {
        this.setState({
            message: e.currentTarget.value
        })
    };

    render() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        return (
            <div className="chat__container">
                <div className="chat__header">
                    <div className="chat__header__back" onClick={this.handleClickBack}></div>
                    <div>
                        {user.name}
                    </div>
                    <div className="chat__header__but" onClick={this.handletClickProfile}></div>
                </div>
                <div className="chat__main">
                    {this.state.messages.map(value => (<Message>{`${value.name} --  ${value.message}`}</Message>))}
                </div>
                <div className="chat__footer">
                    <div className="chat__hordot"> </div>
                    <form className="chat__form">

                        <input id="m"
                               className="chat__enter"
                               autoComplete="off"
                               value={this.state.message}
                               onClick={this.handleActive}
                               onChange={this.handleChangeInput}/>
                        <button
                            onClick={this.handleClick}
                            className="chat__send"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch)=>{
  return {
      getProfile: ()=>dispatch(getProfile())
  }
};
export default connect(null,mapDispatchToProps)(Chat);
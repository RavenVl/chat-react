import React from 'react';
import './Message.css';
class Message extends React.Component{
    render(){
        return(
            <div className="mes_container">
                <div>
                    {this.props.children}
                </div>

            </div>
        )
    }
}
export default Message;
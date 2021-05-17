import { React, Component } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { keys } from '../config/keys';

let outputField;
// const feedbackField = document.getElementById('feedback-div');

export default class ChatPage extends Component {
    constructor(props){
        super(props);

        this.socket = undefined;
        this.previousDisplayName = 'anonymous';
        
        this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onSendMessageClick = this.onSendMessageClick.bind(this);
        this.onMessageTyping = this.onMessageTyping.bind(this);
        this.onStoppedTyping = this.onStoppedTyping.bind(this);
        this.onFocusDisplayNameField = this.onFocusDisplayNameField.bind(this);
        this.onLeaveDisplayNameField = this.onLeaveDisplayNameField.bind(this);

        this.state = {
            sender: 'anonymous',
            participants: ['anonymous'],
            feedback: '',
            message: '',
            currentUser: {},
        }
    }

    async getCurrentUserDetails(id){
        const response = await axios.get(`${keys.SERVER_API_URI}/${id}`);
        if(response.status === 200){
            return response.data.user;
        } else {
            return null;
        }
    }

    async componentDidMount(){
        // Get current user details
        if(localStorage.getItem('currentChattieUser')){
            const id = localStorage.getItem('currentChattieUser');
            const userDetails = await this.getCurrentUserDetails(id);

            // console.log('User Details: ', userDetails);

            if(userDetails){
                this.setState({
                    currentUser: userDetails,
                    sender: userDetails.display_name,
                });

                this.previousDisplayName = userDetails.display_name;
            }
        }

        outputField = document.getElementById('output-div');

        this.socket = io(keys.SOCKET_URI);
        this.socket.on('connect', ()=>{
            if(this.state){
                this.socket.emit('join', this.state.sender);
            }
            
            this.socket.on('joining', (data)=>{
                let feedback = `${data} has joined the chatroom`;
                this.setState({
                    feedback: feedback,
                });

            });

            this.socket.on('chat', (data) => {
                // console.log(data.sender + ', ' + data.message);
                if(data.sender === this.state.sender){
                    outputField.innerHTML += `<div class='sender'><div>
                        <strong>
                            ${data.sender === this.state.sender ? 'Me': data.sender}:
                        </strong> 
                        ${data.message}
                    </div></div>`;
                } else{
                    outputField.innerHTML += `<div class='receiver'><p>
                        <strong>
                            ${data.sender === this.state.sender ? 'Me': data.sender}:
                        </strong> 
                        ${data.message}
                    </p></div>`;
                }
            });

            this.socket.on('typing', (data) => {
                this.setState({
                    feedback: data,
                });
            });

        });
    }

    componentWillUnmount(){
        // socket.disconnect();
    }

    onChangeMessage(e){
        this.setState({
            message: e.target.value,
        });
    }

    onChangeDisplayName(e){
        this.setState({
            sender: e.target.value,
        });
    }

    onFocusDisplayNameField(e){
        this.previousDisplayName = e.target.value;
    }

    onLeaveDisplayNameField(e){
        if(this.previousDisplayName !== e.target.value){
            this.socket.emit('typing', this.previousDisplayName + ' changed his name to ' + 
                e.target.value);

            this.previousDisplayName = e.target.value;
        }
    }

    onSendMessageClick(e){
        e.preventDefault();
        
        const msg = this.state.message
        // if(this.socket.connected && this.state?.message){
            
        this.socket.emit('chat', 
            { 
                sender: this.state.sender,
                message: msg,
            }
        );

        this.setState({
            message: '',
        });
        // }

    }

    onMessageTyping(e){
        this.socket.emit('typing', this.state.sender + ' is typing...')
    }

    onStoppedTyping(e){
        this.setState({
            feedback: '',
        });
    }

    render(){
        return (
            <div className='container chat'>
                <div className='page-title'>
                    Chat Room 
                    <span> Welcome <strong> {this.state.sender} </strong> </span>
                </div>
                <hr />
                
                <div className='title form-group' id='user-title'>
                    <label htmlFor='display-name-input'>Nickname:</label>
                    <input type='text' id='display-name-input'className='display-name' 
                        onChange={this.onChangeDisplayName} value={this.state.sender}
                        placeholder='Nickname' onFocus={this.onFocusDisplayNameField} 
                        onBlur={this.onLeaveDisplayNameField} />
                </div>
                <hr />

                <div className='page-body conatiner chat-window'>

                    <div className='feedback' id='feedback-div'>
                        {this.state.feedback}
                    </div>

                    <div className='output' id='output-div'>
                    </div>

                    <hr/>
                    <div className='message-area form-group'>
                        
                        <textarea className='message form-control' name='message-input' 
                        id='message-input' placeholder='Your message here...'
                            row='4' onKeyPress={this.onMessageTyping} 
                            onChange={this.onChangeMessage} 
                            value={this.state.message} onBlur={this.onStoppedTyping}></textarea>
                        
                        <input type='submit' onClick={this.onSendMessageClick} className='btn btn-primary btn-send' value='Send' />
                    </div>
                </div>
            </div>
        );
    }
}
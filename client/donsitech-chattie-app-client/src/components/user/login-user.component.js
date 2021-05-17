import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { keys } from '../../config/keys';

export default class LoginUserPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onLoginClicked = this.onLoginClicked.bind(this);

    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value,
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value,
        });
    }

    async onLoginClicked(e){
        e.preventDefault();

        const data = {
            username: this.state.username,
            password: this.state.password,
        };

        const response = await axios.post(`${keys.SERVER_API_URI}/authenticate`, data);
        if(response.status === 200){
            const authenticatedUser = response.data.user;
            if(localStorage){
                localStorage.setItem('currentChattieUser', authenticatedUser._id);
                this.setState({
                    username: '',
                    password: '',
                });
            }

            window.location = '/chat';

        } else {
            alert('Sorry, User cannot be authenticated. \n' +
                'Please check your credentials or Sign Up as new user.');
        }

    }

    render(){
        return (
            <div className='container wrapper'>
                <div className='page-title'>
                    <h3> Please sign in </h3>
                </div>
                <div className='page-body login-div'>
                    <form className="form">
                        <div className="form-group">
                            <label htmlFor="username" className="form-label"> Username: </label>
                            <input type="text" className="form-control" id="username" 
                                name="username" placeholder="Your username here"
                                value={this.state.username} 
                                onChange={this.onChangeUsername}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label"> Password: </label>
                            <input type="password" className="form-control" id="password" 
                                name="password" placeholder="Your password here" 
                                value={this.state.password} 
                                onChange={this.onChangePassword} />
                        </div>

                        <div className="form-group btn-group2">
                            <input type="submit" className="btn btn-primary" id="login-btn" 
                                name="login" value="Login" onClick={this.onLoginClicked} />
                            {/* <input type="button" className="btn" id="signup-btn" 
                                name="signup" value="Sign Up" /> */}
                            <Link to='/signup' className='btn signup-btn'> Sign Up </Link>
                        </div>
                    </form>
                </div>
                
            </div>
        );
    }
}
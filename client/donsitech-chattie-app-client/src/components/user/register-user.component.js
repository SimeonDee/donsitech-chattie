import { React, Component } from 'react';
import axios  from 'axios';
import { keys } from '../../config/keys';

export default class RegisterUserPage extends Component {
    constructor(props){
        super(props);

        this.passportField = undefined;

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
        this.onChangeFullname = this.onChangeFullname.bind(this);
        this.onChangePassport = this.onChangePassport.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: 'anonymous',
            password: '',
            fullname: '',
            display_name: '',
            passport_uri: '/images/passport_default_icon.png',
            status_msg: '',
        }
    }

    componentDidMount(){
        this.passportField = document.querySelector('.passport');

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

    onChangeFullname(e){
        this.setState({
            fullname: e.target.value,
        });
    }

    onChangeDisplayName(e){
        this.setState({
            display_name: e.target.value,
        });
    }

    onChangeStatus(e){
        this.setState({
            status_msg: e.target.value,
        });
    }

    onChangePassport(e){
        // this.setState({
        //     passport_uri: e.target.value,
        // });

        console.log(e.target.value);

    }

   async onSubmit(e){
        e.preventDefault();
        // console.log('I got here');
        const data = {
            username: this.state.username,
            password: this.state.password,
            fullname: this.state.fullname,
            display_name: this.state.display_name,
            status_msg: this.state.status_msg,
            passport_uri: this.state.passport_uri,
        }

        const response = await axios.post(keys.SERVER_API_URI, data);        
        
        if(response.status === 201){
            if(localStorage){
                localStorage.setItem('currentChattieUser', response.data.user._id);
                alert('Registered Successfully');
                this.setState({
                    username: 'anonymous',
                    password: '',
                    fullname: '',
                    display_name: '',
                    passport_uri: '/images/passport_default_icon.png',
                    status_msg: '',
                });

                window.location = '/chat';
            }

        } else {
            alert('Registration Failed: \n' + response.data.message);
        }
        
    }

    render(){
        return (
            <div className='container wrapper'>
                <div className='page-title'>
                    <h3> Register as new user </h3>
                </div>
                <div className='page-body register-div'>
                    <form className="form">
                        <div className="form-group passport-div">
                            <img src={this.state.passport_uri} alt='passport' 
                                accept='image/*.*' width='100px' height='120px' />
                            
                            <p><label htmlFor='passport'>Upload Passport</label></p>
                            <input type="file" className="form-file passport" id="passport" 
                                name="passport" placeholder="Upload Passport" 
                                onChange={this.onChangePassport} />
                        </div>
                        <hr />
                        {/* <div className='register-fieldset'> */}
                            <div className="form-group">
                                <label htmlFor="username" className="form-label"> Username: </label>
                                <input type="email" className="form-control" id="username" 
                                    name="username" placeholder="Your username here" 
                                    value={this.state.username} onChange={this.onChangeUsername} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label"> Password: </label>
                                <input type="password" className="form-control" id="password" 
                                    name="password" placeholder="Your password here" 
                                    value={this.state.password} onChange={this.onChangePassword} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="fullname" className="form-label"> Fullname: </label>
                                <input type="text" className="form-control" id="fullname" 
                                    name="fullname" placeholder="Your fullname here" 
                                    value={this.state.fullname} onChange={this.onChangeFullname} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="display-name" className="form-label"> Display name (nickname): </label>
                                <input type="text" className="form-control" id="display-name" 
                                    name="display-name" placeholder="Your common name here" 
                                    value={this.state.display_name} onChange={this.onChangeDisplayName} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status-input" className="form-label"> Your brief description: </label>
                                <textarea className='status form-control' name='status-input' 
                                id='status-input' placeholder='What you want others to know about you...'
                                    row='4' onChange={this.onChangeStatus} value={this.state.status_msg}></textarea>    
                            </div>

                            <div className="form-group btn-group2">
                                <input type="submit" className="btn btn-primary" 
                                    id="register-btn" name="register-btn" value="Register" 
                                    onClick={this.onSubmit} />
                                {/* <input type="button" className="btn" id="signup-btn" 
                                    name="signup" value="Sign Up" /> */}
                            </div>
                        {/* </div> */}
                    </form>
                </div>
            </div>
        );
    }
}
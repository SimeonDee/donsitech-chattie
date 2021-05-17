import { React, Component } from 'react';
import { Link } from 'react-router-dom';

export default class Homepage extends Component {
    render(){
        return (
            <div className='container wrapper'>
                    <div className='page-title'>
                        Welcome to Donsitech Chattie App 
                    </div>
                    <div className='page-body'>
                        <p>
                            A place where you can connect with the world and your loved ones. 
                            Chat with your friends and colleagues. 
                        </p>
                        <p>
                            <Link to='/login'> Sign in </Link> if you are a registered user or 
                            <Link to='/signup'> Sign up </Link> with us, to start chatting with 
                            your friends and loved ones.
                        </p>

                    </div>
                    
                </div>
        );
    }
}
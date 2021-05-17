import { React, Component } from 'react';
import axios from 'axios';
import { keys } from '../../config/keys';
import DisplayUser from './display-user.component';

// import { Link } from 'react-router-dom';

export default class SelectUsersPage extends Component {
    constructor(props){
        super(props);

        this.isUserAlreadySelected = this.isUserAlreadySelected.bind(this);
        this.getUser = this.getUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.addUserToSelected = this.addUserToSelected.bind(this);
        this.showUsers = this.showUsers.bind(this);
        
        this.state = {
            users: [],
            selected_users: [],
        }
    }

    async componentDidMount(){
        const response = await axios.get(keys.SERVER_API_URI);
        if(response.status === 200){
            this.setState({
                users: response.data.users,
            });
        } else {
            alert('Sorry, failed loading registered users. Please refresh page.\n', 
            response.data.message);
        }
    }

    deleteUser(id){
        this.setState({
            users: this.state.users.filter((user) => user._id !== id),
        });
    }

    isUserAlreadySelected(id){
        if(this.state.selected_users.length > 0){
            const alreadyAdded = this.state.selected_users.filter(
                (user) => user._id === id);
            if((alreadyAdded && alreadyAdded.length > 0)){
                return true;
            } else{
                return false;
            }
        }
        return false;
    }

    getUser(id){
        let foundUser = this.state.users.filter((user) => (user._id === id));
        
        if(foundUser){
            return foundUser; 
        } else{
            return null;
        }
    }

    addUserToSelected(id){
        if(!this.isUserAlreadySelected(id)){
            const user = this.getUser(id);
            console.log('Found User: ', user);
        }
    }

    showUsers(){
        return this.state.users.map((user) => {
            return <div key={user._id}> 
                <DisplayUser user={user} key={user._id} 
                    deleteUser={this.deleteUser} addUserToSelected={this.addUserToSelected} />
                <hr />
            </div>;
        });
    }

    render(){
        return (
            <div className='container wrapper'>
                    <div className='page-title'>
                        Select user(s) to chat with... 
                    </div>
                    <div className='page-body'>
                        {this.showUsers()}
                    </div>
                    
                </div>
        );
    }
}
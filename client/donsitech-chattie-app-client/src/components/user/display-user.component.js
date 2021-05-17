import { React } from 'react';
// import { Link } from 'react-router-dom';

export default function DisplayUser(props) {
    return (
        <div className='one-user-div card-md bg-light'> 
            <div className='header'> 
                <span><strong> {props.user.fullname} </strong></span>
                <p> (a.k.a {props.user.display_name}) </p>    
            </div>
            <div className='status_msg'>
                <strong><i> Status </i> </strong>
                <p>{props.user.status_msg}</p>
            </div>
            <div className='form-group'>
                <input type='button' className='btn btn-primary' value='Add User' 
                    onClick={props.addUserToSelected(props.user._id)} />
                <input type='button' className='btn btn-danger' value='Remove User' 
                    onClick={props.deleteUser(props.user._id)} />
            </div>
        </div>
    );
}
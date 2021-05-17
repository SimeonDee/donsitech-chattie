import { React } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
    return (
        <nav>
            <ul className="nav bg-dark">

                <li className="nav-item"> 
                    <Link to='/' className="nav-link"> Home </Link>
                </li>
                
                <li className="nav-item"> 
                    <Link to='/login' className="nav-link"> Sign in </Link>
                </li>
                
                <li className="nav-item"> 
                    <Link to='/select_users' className="nav-link"> Select Users </Link>
                </li>

                <li className="nav-item"> 
                    <Link to='/chat' className="nav-link"> Chat Room </Link>
                </li>

            </ul>
        </nav>  
    );
}
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Navbar from './components/navbar.component';
import Footer from './components/footer.component';
import Homepage from './components/home.component';
import RegisterUserPage from './components/user/register-user.component';
import LoginUserPage from './components/user/login-user.component';
import ChatPage from './components/chat.component';
import SelectUsersPage from './components/user/select-users.component';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Navbar />
    
          <div className="content">
            <Route path='/' exact component={Homepage}/>
            <Route path='/login' component={LoginUserPage}/> 
            <Route path='/signup' component={RegisterUserPage}/>
            <Route path='/chat' component={ChatPage}/>
            <Route path='/select_users' component={SelectUsersPage}/>
            
          </div>
    
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;

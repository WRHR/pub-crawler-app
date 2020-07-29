import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import {Route, Switch, Redirect, Link} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home'

class App extends Component {

  state = {
    user:{}
  }

  componentDidMount(){
    if(localStorage.token){
      this.authorizeUser()
    }
  }

  setUser = (user) => this.setState({user: user})

  authorizeUser = () => {
    fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then(response => response.json())
    .then(result => {
      this.setState({
        user: result.user
      })
    })
  }

  render(){
    const {user} = this.state
    return (
      <div className="App">
        <header>
          {user.username 
            ? (
              <nav>
                <h3>Pub Crawler</h3>
                <Link to='/login'>Logout</Link>
              </nav>
            )
            : null
          }
        </header>
        <Switch>
          <PrivateRoute 
            exact
            path='/'
            component={Home}
          />
          <Route exact path='/login' render={(routerProps) => {return <Login setUser={this.setUser} {...routerProps} />} }/>
          <Redirect to='/' />
        </Switch>
        
      </div>
    );
  }
    
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import {Route, Switch, Redirect, Link} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home'
import MyFavorites from './components/MyFavorites'
import CrawlDetail from './components/CrawlDetail'

const favoritesUrl = "http://localhost:3000/favorites/"

class App extends Component {

  state = {
    user:{},
    userCrawls:[],
    favorites:[],
    crawls:[],
  }

  componentDidMount(){
    if(localStorage.token){
      this.authorizeUser()
    }
    this.getCrawlList()
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
        user: result.user,
        favorites: result.favorites
      })
    })
  }

  getCrawlList = () => {
    fetch('http://localhost:3000/crawls')
      .then(response => response.json())
      .then(results => this.setState({crawls:results}))
  }


  addToFavorites = (pub) => {
    let pub_name = pub.name
    let brewery_id = pub.id
    let favorite = {pub_name, brewery_id}
    fetch(favoritesUrl, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({favorite})
    })
    .then(response => response.json())
    .then(result => this.setState({favorites: [...this.state.favorites, result.favorite]}))
  }

  removeFromFavorites = (pub) => {
    let favorite =  this.state.favorites.filter(favorite=> favorite.brewery_id === pub.id)[0]
    let updatedFavs = this.state.favorites.filter(favorite => favorite.brewery_id !== pub.id)
    fetch(favoritesUrl+favorite.id, {
      method:'DELETE',
      headers:{"Authorization": `Bearer ${localStorage.token}`}
    }).then(()=> this.setState({favorites: updatedFavs}))
  }

  render(){
    const {user, favorites, crawls} = this.state

    return (
      <div className="App">
        <header>
          {user.username 
            ? (
              <nav>
                <h3>Pub Crawler</h3>
                <Link to='/'>Home</Link>
                <Link to='/mycrawls'>My Pub Crawls</Link>
                <Link to='/myfavorites'>Favorites</Link>
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
            crawls={crawls}
            
          />
          <PrivateRoute 
            exact
            path= '/myfavorites'
            component={MyFavorites}
            favorites={favorites}
            addToFavorites={this.addToFavorites}
            removeFromFavorites={this.removeFromFavorites}
          />
          <PrivateRoute 
            path='/crawl/:id'
            component={CrawlDetail}
            user={user}
            favorites={favorites}
            addToFavorites={this.addToFavorites}
            removeFromFavorites={this.removeFromFavorites}
          />
          <PrivateRoute 
            exact
            path= '/mycrawl'
          />
          <Route exact path='/login' render={(routerProps) => {return <Login setUser={this.setUser} {...routerProps} />} }/>
          <Redirect to='/' />
        </Switch>
        
      </div>
    );
  }
    
}

export default App;

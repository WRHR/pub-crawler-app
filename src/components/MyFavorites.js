import React, {Component} from 'react'
import PubCard from './PubCard'

export default class MyFavorites extends Component{
    
    state = {
        myFavorites: []
    }
    
    componentDidMount(){
        if(this.props.favorites){
            let favoritesPubIds = this.props.favorites.map(favorite => favorite.brewery_id)
            favoritesPubIds.map(favorite => this.getDetails(favorite))
        }
    }

    getDetails = (favorite) =>{
        fetch(`https://api.openbrewerydb.org/breweries/${favorite}`)
        .then(response => response.json())
        .then(result => this.setState({myFavorites:[...this.state.myFavorites, result]}))

    }

    createFavorites = () => {
        return this.state.myFavorites.map(pub => {
            return(
                <PubCard 
                    key={pub.id} 
                    addToFavorites={this.props.addToFavorites}
                    removeFromFavorites={this.props.removeFromFavorites} 
                    pub={pub} 
                    favorites={this.props.favorites}
                />
            )
        })
    }



    render(){
        return(
            <div className='favorites'>
                <h1>My Favorite Pubs</h1>
                <ul>
                    {this.createFavorites()}           
                </ul> 
    
            </div>
        )
    }
}
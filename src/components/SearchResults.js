import React from 'react'
import PubCard from './PubCard'

export default function SearchResults({pubSearch, addToFavorites, removeFromFavorites, favorites}){

    const showResults = () => {
        return pubSearch.map(pub => 
            <PubCard 
                key={pub.id} 
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites} 
                pub={pub} 
                favorites={favorites}
            />)
    }

    return(
        <ul>
            {showResults()}
        </ul>
    )
}
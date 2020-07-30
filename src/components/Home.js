import React from 'react'
import PubSearch from './PubSearch'
import SearchResults from './SearchResults'

export default function Home(props){
    return(
        <div>
            <PubSearch setPubs={props.setPubs} />
            <SearchResults 
                pubSearch={props.pubSearch} 
                addToFavorites={props.addToFavorites} 
                removeFromFavorites={props.removeFromFavorites}
                favorites={props.favorites}
            />
        </div>
    )
}
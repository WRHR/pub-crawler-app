import React from 'react'
import PubSearch from './PubSearch'
import SearchResults from './SearchResults'
import Crawls from './Crawls'
import CreateCrawl from './CreateCrawl'

export default function Home(props){
    return(
        <div>
            <Crawls crawls={props.crawls} /> 
            <CreateCrawl />
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
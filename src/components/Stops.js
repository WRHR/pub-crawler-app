import React from 'react'
import StopCard from './StopCard'
import PubSearch from './PubSearch'

export default function Stops({crawlStops, addToFavorites, removeFromFavorites, favorites, crawl, setCrawlStops}){

    const displayStops = () => {
        return crawlStops.map(stop => 
            <StopCard
                key={stop.id} 
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites} 
                stop={stop}
                favorites={favorites}
                crawl={crawl}
                crawlStops={crawlStops}
                setCrawlStops={setCrawlStops} 
            />)
    }

    return(
        <div className='stop-container'>
            <h3>Crawl Stops</h3>
            <ul>
                {displayStops()}
            </ul>
        </div>
    )
}
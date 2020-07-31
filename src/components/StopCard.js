import React, {useState} from 'react'

export default function StopCard({addToFavorites,removeFromFavorites,stop, favorites, crawl, crawlStops, setCrawlStops}){

    const [toggle, setToggle] = useState(false)

    const showPubDetail = (event) => {
        return(
            <div className='pub-details'>
                {favoriteButton()}
                {stop.website ? <a href={stop.website} target='_blank'>Website</a> : null}
                <button onClick={handleRemoveFromCrawl}>Remove From Crawl</button>
            </div>
        )
    }

    const handleAddFavorite = (event) => {
        let pub={
            name:stop.pub_name,
            id:stop.brewery_id
        }
        event.stopPropagation()
        addToFavorites(pub)
        favoriteButton()
    }

    const removeFavorite = (event) => {
        let pub={
            name:stop.pub_name,
            id:stop.brewery_id
        }
        event.stopPropagation()
        removeFromFavorites(pub)
        favoriteButton()
    }

    const favoriteButton = () => {
        let favoritePubIds = favorites.map(favorite => favorite.brewery_id)
        return favoritePubIds.includes(stop.brewery_id) 
            ? <button onClick={removeFavorite} >Unfavorite</button>
            : <button onClick={handleAddFavorite} >Favorite</button>
    }

    const HandleToggle = (event) => {
        event.stopPropagation()
        setToggle(!toggle)
    }

    const handleRemoveFromCrawl =(event)=>{
        event.stopPropagation()
        
        fetch(`http://localhost:3000/stops/${stop.id}`, {
            method:'DELETE',
            headers:{"Authorization": `Bearer ${localStorage.token}`},
        })
        let updatedStops = crawlStops.filter(listStop => listStop.id !== stop.id)
        setCrawlStops(updatedStops)
    }

    return(
        <li className='pub-card' onClick={HandleToggle} >
            <h3>{stop.pub_name}</h3>
            <p>Address: {stop.pub_address}</p>
            {toggle ? showPubDetail(): null}
            
        </li>
    )
}
import React, {useState} from 'react'

export default function PubCard({pub, favorites, addToFavorites, removeFromFavorites, crawl, crawlStops, setCrawlStops}){
    const [toggle, setToggle] = useState(false)

    const handleAddFavorite = (event) => {
        event.stopPropagation()
        addToFavorites(pub)
        favoriteButton()
    }

    const removeFavorite = (event) => {
        event.stopPropagation()
        removeFromFavorites(pub)
        favoriteButton()
    }

    const favoriteButton = () => {
        let favoritePubIds = favorites.map(favorite => favorite.brewery_id)
        return favoritePubIds.includes(pub.id) 
            ? <button onClick={removeFavorite} >Unfavorite</button>
            : <button onClick={handleAddFavorite} >Favorite</button>
    }

    const showPubDetail = (event) => {
        return(
            <div className='pub-details'>
                <p>Address: {pub.street}</p>
                <p>City: {pub.city}</p>
                <p>State: {pub.state}</p>
                {pub.latitude && <p>Lat:{pub.latitude} Long:{pub.longitude}</p>}
                {pub.website_url ? <a href={pub.website_url} target='_blank'>Website</a> : null}
            </div>
        )
    }
    
    const HandleToggle = (event) => {
        event.stopPropagation()
        setToggle(!toggle)
    }

    

    const handleAddToCrawl = (event) => {
        event.stopPropagation()

        let stop = {
            crawl_id: crawl.id,
            brewery_id: pub.id,
            pub_name: pub.name,
            pub_address: pub.street,
            brewery_latitude: pub.latitude,
            brewery_longitude: pub.longitude,
            webstie: pub.website
        }

        fetch('http://localhost:3000/stops',{
            method: 'POST',
            headers:{
                "Authorization": `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({stop})
        })
        .then(response => response.json())
        .then((result=> setCrawlStops([...crawlStops, result])))
    }

    const crawlStopsId = crawlStops.map(stop => stop.brewery_id)
    
    return(
        <li className='pub-card' onClick={HandleToggle}>
            <h3 >{pub.name}</h3>
            {toggle ? showPubDetail() : null}
            {favoriteButton()}
            {crawl && !crawlStopsId.includes(pub.id) ? <button onClick={handleAddToCrawl}>Add to Crawl</button> : null }
        </li>
    )
}
import React, {useState} from 'react'

export default function PubCard({pub, favorites, addToFavorites, removeFromFavorites, crawl}){
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
                {pub.website_url ? <a href={pub.website_url} target='_blank'>Website</a> : null}
            </div>
        )
    }
    
    const HandleToggle = (event) => {
        event.stopPropagation()
        setToggle(!toggle)
    }
    
    return(
        <li className='pub-card' onClick={HandleToggle}>
            <h3 >{pub.name}</h3>
            {toggle ? showPubDetail() : null}
            {favoriteButton()}
            {crawl ? <button>Add to Crawl</button> : null }
        </li>
    )
}
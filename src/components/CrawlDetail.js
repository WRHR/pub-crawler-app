import React, {useState, useEffect} from 'react'
import PubSearch from './PubSearch'
import SearchResults from './SearchResults'
import Stops from './Stops'
import {WrappedMap} from './Map'

export default function CrawlDetail({routerProps, user, ...props}){
    const crawlURL = `http://localhost:3000/crawls/${routerProps.match.params.id}`
    
    const [crawl, setCrawl] = useState({})
    const [pubSearch, setPubSerch] = useState([])
    const [crawlStops, setCrawlStops] = useState([])
    

    useEffect(()=>{    
        fetchCrawl()
    }, [])

    const fetchCrawl = () => {
        fetch(crawlURL)
            .then(response => response.json())
            .then(results => {
                setCrawl(results.crawl)
                setCrawlStops(results.stops)
            })
    }

    const handleDelete= (event)=> {
        event.stopPropagation()
        fetch(crawlURL, {
            method:'DELETE',
            headers:{"Authorization": `Bearer ${localStorage.token}`}
        })
            .then(()=> alert('Pub Crawl has been deleted'))
            .then(()=> props.updateCrawlList(crawl))
            .then(()=>{routerProps.history.push('/')})
    }



    return(
        <div >
            <div className='crawl-detail'>
                <h1>{crawl.name}</h1>
                <div style={{width: '100%'}}>
                    <WrappedMap 
                        crawlStops={crawlStops}
                        googleMapURL={`http://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                        loadingElement={<div style={{height: '400px'}}/>}    
                        containerElement={<div style={{height: '400px'}}/>}    
                        mapElement={<div style={{height: '400px'}}/>}    
                    />
                    <Stops 
                        crawlStops={crawlStops}
                        addToFavorites={props.addToFavorites} 
                        removeFromFavorites={props.removeFromFavorites}
                        favorites={props.favorites}
                        crawl={crawl}
                        crawlStops={crawlStops}
                        setCrawlStops={setCrawlStops}
                    />

                </div>
            </div>
            {crawl.user_id === user.id 
                ? (
                    <>
                        <PubSearch setPubs={setPubSerch} />
                        <SearchResults 
                            pubSearch={pubSearch} 
                            addToFavorites={props.addToFavorites} 
                            removeFromFavorites={props.removeFromFavorites}
                            favorites={props.favorites}
                            crawl={crawl}
                            crawlStops={crawlStops}
                            setCrawlStops={setCrawlStops}
                        />
                        {/* <button onClick={handleEditForm}>Edit Pub Crawl</button> */}
                        <button onClick={handleDelete}>Delete Crawl</button>
                    </>
                )
                : null
             }

        </div>
    )
}
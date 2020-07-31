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
        <div style={{width: '100vw', display:'flex',flexDirection:'column', alignItems:'center'}}>
            <div className='crawl-detail'>
                <div style={{width: '100vh'}}>
                    <WrappedMap 
                        crawlStops={crawlStops}
                        googleMapURL={`http://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                        loadingElement={<div style={{height: '400px'}}/>}    
                        containerElement={<div style={{height: '400px'}}/>}    
                        mapElement={<div style={{height: '400px'}}/>}    
                    />
                </div>
                <div className='title'>
                    <h1>{crawl.name}</h1>
                    {crawl.user_id === user.id 
                        && <button onClick={handleDelete}>Delete Crawl</button>}
                </div>
                <div style={{ display:'flex', }}>
                    <Stops 
                        crawlStops={crawlStops}
                        addToFavorites={props.addToFavorites} 
                        removeFromFavorites={props.removeFromFavorites}
                        favorites={props.favorites}
                        crawl={crawl}
                        crawlStops={crawlStops}
                        setCrawlStops={setCrawlStops}
                    />

            {crawl.user_id === user.id 
                && (
                    <div className='user-controls'>
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
                        
                    </div>
                )
             }
                </div>
            </div>

        </div>
    )
}
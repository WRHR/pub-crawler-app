import React, {useState, useEffect} from 'react'
import PubSearch from './PubSearch'
import SearchResults from './SearchResults'

export default function CrawlDetail({routerProps}){

    useEffect(()=>{    
        fetchCrawl()
    }, [])

    const [crawl, setCrawl] = useState()

    const fetchCrawl = () => {
        fetch(`http://localhost:3000/crawls/${routerProps.match.params.id}`)
            .then(response => response.json())
            .then(results => setCrawl(results))
    }

    return(
        <div>
            <h1>This is a single crawl</h1>
            <PubSearch /> 
            {/* <SearchResults /> */}
        </div>
    )
}
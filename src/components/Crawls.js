import React from 'react'
import CrawlCard from './CrawlCard'


export default function Crawls({crawls}){
    
    const displayCrawls = () => {
        return crawls.map(crawl => <CrawlCard key={crawl.id} crawl={crawl} /> )
    }

    return(
        <div className='crawl-list'>
            <h1>Popular Crawls</h1>
            <ul>
                {displayCrawls()}
            </ul>
        </div>
    )
}
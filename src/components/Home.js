import React from 'react'
import Crawls from './Crawls'
import CreateCrawl from './CreateCrawl'

export default function Home(props){
    return(
        <div>
            <Crawls crawls={props.crawls} /> 
            <CreateCrawl routerProps={props.routerProps}/>
            
        </div>
    )
}
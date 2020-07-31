import React from 'react'
import Crawls from './Crawls'
import CreateCrawl from './CreateCrawl'

export default function Home(props){
    return(
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Crawls crawls={props.crawls} /> 
            <CreateCrawl routerProps={props.routerProps}/>
            
        </div>
    )
}
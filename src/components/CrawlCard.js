import React from 'react'
import {Link} from 'react-router-dom'
export default function CrawlCard({crawl}){

    return(
        <li>
            <h2>
                <Link to={`/crawl/${crawl.id}`}>
                    {crawl.name}
                </Link>
            </h2>
        </li>
    )
}
import React from 'react'

export default function CreateCrawl(props) {
    return(
        <form>
            <h3>Create a new Pub Crawl</h3>
            <label>Crawl Name</label>
            <input 
            type='text'
            name='name' 
            />
        </form>
    )
}
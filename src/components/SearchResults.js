import React from 'react'
import PubCard from './PubCard'

export default function SearchResults({pubSearch}){

    const showResults = () => {
        return pubSearch.map(pub => <PubCard pub={pub}/>)
    }

    return(
        <ul>
            {showResults()}
        </ul>
    )
}
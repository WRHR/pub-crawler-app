import React from 'react'
import PubSearch from './PubSearch'

export default function Home(props){
    return(
        <div>
            <PubSearch setPubs={props.setPubs}/>
        </div>
    )
}
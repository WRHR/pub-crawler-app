import React, {useState} from 'react'

export default function PubCard({pub}){
    const [toggle, setToggle] = useState(false)

    const showPubDetail = () => {
        return(
            <div className='pub-details'>
                <p>Address: {pub.street}</p>
                <p>City: {pub.city}</p>
                <p>State: {pub.state}</p>
                {pub.website_url ? <a href={pub.website_url} target='_blank'>Website</a> : null}
            </div>
        )
    }

    const HandleToggle = () => setToggle(!toggle)
    const ToggleBack =() => setToggle(!toggle)

    return(
        <li className='pub-card' onClick={HandleToggle} onBlur={ToggleBack}>
            <h3 >{pub.name}</h3>
            {toggle ? showPubDetail() : null}
        </li>
    )
}
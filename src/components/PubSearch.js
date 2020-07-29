import React, {useState} from 'react'

export default function PubSearch({setPubs}){

    const pubsUrl = 'https://api.openbrewerydb.org/breweries?'

    const [search, setSearch] = useState('')
    const [searchType, setSearchType] = useState('')

    const onSearchChange = ({target}) => setSearch(target.value)
    const typeChange = ({target}) => setSearchType(target.value)

    const submitSearch = (event) => {
        event.preventDefault()
        fetch(pubsUrl+searchType+search)
            .then(response => response.json())
            .then(results => setPubs(results))
            .then(() => {
                setSearch('')
                setSearchType('')
            })
    }

    return(
        <div className='search-bar' >
            <form onSubmit={submitSearch}>
                <div>
                    <input 
                        type='text'
                        value={search}
                        placeholder='Search Pubs by: State, City or Area Code'
                        onChange={onSearchChange}
                    />
                        <input type='submit' value='🔍' onSubmit={submitSearch}/>
                </div>
                <div>
                    <input 
                        onChange={typeChange} 
                        type='radio' 
                        name='search-type' 
                        value='by_state=' 
                    />
                    <label>State</label>
                    <input 
                        onChange={typeChange} 
                        type='radio' 
                        name='search-type'
                        value='by_city=' 
                    />
                    <label>City</label>
                    <input 
                        onChange={typeChange} 
                        type='radio' 
                        name='search-type'
                        value='by_name=' 
                    />
                    <label>Area Code</label>
                    <input 
                        onChange={typeChange} 
                        type='radio' 
                        name='search-type'
                        value='by_name=' 
                    />
                    <label>Pub Name</label>
                </div>
            </form>
        </div>
    )
}
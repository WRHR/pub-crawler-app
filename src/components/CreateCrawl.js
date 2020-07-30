import React, {useState} from 'react'

export default function CreateCrawl(props) {
    const [name, setName] = useState('')

    const handleChange = ({target}) => setName(target.value)

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch('http://localhost:3000/crawls',{
            method:'POST',
            headers:{
                "Authorization": `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name})
        })

    }

    return(
        <div className='crawl-form-container'>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                    type='text'
                    name='name' 
                    placeholder='New Pub Crawl Name'
                    onChange={handleChange}
                    value={name}
                    />
                    <input type='submit' value='Create a New Pub Crawl!' />
                </div>
            </form>
        </div>
    )
}
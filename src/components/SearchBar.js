import React, { useState } from 'react'

function SearchBar(props) {
    const [quesQuery, setQuesQuery] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        props.onSubmitFcardSearch(quesQuery)
    }

    return (
        <form onSubmit={onSubmit} className="SearchBar-fcard-ques">
            <input
                type="search"
                placeholder="search questions"
                value={quesQuery}
                onChange={(e) => {
                    setQuesQuery(e.target.value) 
                    props.onSubmitFcardSearch(e.target.value)
                }}
                required={true}
            />
        </form>
    )
}

export default SearchBar

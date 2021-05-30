import React, { useState } from 'react'

function SearchBar(props) {
    const [quesQuery, setQuesQuery] = useState('')

    function submitSearch(e) {
        e.preventDefault()
        props.onSubmitFcardSearch(quesQuery)
        setQuesQuery('')
    }

    return (
        <form onSubmit={submitSearch}>
            <input
                placeholder="search questions"
                value={quesQuery}
                onChange={(e) => { setQuesQuery(e.target.value) }}
                required={true}
            />
            <button 
                type="button" 
                onClick={props.clearFcardSearch} 
                className="gray-72">
                _X_
            </button>
        </form>
    )
}

export default SearchBar

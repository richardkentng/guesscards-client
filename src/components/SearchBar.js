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
                placeholder="search question (exact)"
                value={quesQuery}
                onChange={(e) => { setQuesQuery(e.target.value) }}
            />
        </form>
    )
}

export default SearchBar

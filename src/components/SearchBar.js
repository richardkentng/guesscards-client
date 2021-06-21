import React, { useState, useEffect } from 'react'
import functions from '../partials/functions'

function SearchBar(props) {
    const [quesQuery, setQuesQuery] = useState('')

    useEffect(() => {
        //pressing 'Escape' will reset search
        const searchEl = document.querySelector('form.SearchBar-fcard-ques input')
        const resetSearchField = (e) => { 
            if (document.activeElement === searchEl && e.code === 'Escape') {
                setQuesQuery('')
                props.resetFcardQuesSearch()
            }
        }
        document.addEventListener('keydown', resetSearchField)

    return () => {
        document.removeEventListener('keydown', resetSearchField)
    }
    }, [])
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

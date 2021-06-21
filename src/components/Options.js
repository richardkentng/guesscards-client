import React, {useEffect} from 'react'
import SearchBar from './SearchBar'
import functions from '../partials/functions'

function Options(props) {

    useEffect(() => {
        functions.clickLastRememberedSortButton()        
    }, [])


    function colorSortButtons(e) {
        const btns = [...document.querySelectorAll('.btn-sort')]

        //record class of clicked button in localStorage.sort
        let btnSortClass
        e.currentTarget.classList.forEach(c => {
            if (c.includes('btn-sort-')) btnSortClass = c
        })
        if (btnSortClass) localStorage.setItem('sort', btnSortClass)

        //only give clicked btn-sort a class of active
        btns.forEach(btn => {
            if (btn === e.currentTarget) btn.classList.add('active')
            else btn.classList.remove('active')
        })
    }

    return (
        <div className="FlashCard Options "
        style={{display: props.numCards >= 2 ? 'block' : 'none'}}
        >
            <button 
                onClick={(e) => {
                    props.sortByRandom()
                    colorSortButtons(e)
                }}
                className="btn-sort btn-sort-rand" 
                >
                Rand
            </button>
            <button
                onClick={(e) => {
                    props.sortByCreatedAt('desc')
                    colorSortButtons(e)
                }}
                className="btn-sort btn-sort-new"
                >
                New
            </button>
            <button
                onClick={(e) => {
                    props.sortByCreatedAt('asc')
                    colorSortButtons(e)
                }}
                className="btn-sort btn-sort-old" 
                >
                Old
            </button>
            <button
                onClick={(e) => {
                    props.sortByMarked()
                    colorSortButtons(e)
                }}
                className="btn-sort btn-sort-mark"
                style={{display: props.numMarked ? 'inline' : 'none'}}
                >
                <span className="text-marked-num">
                    <span>Marked</span>
                    <span className="red-num-marked">&nbsp;{props.numMarked > 0 ? props.numMarked : ''} </span>
                </span>
            </button>
            <SearchBar 
            onSubmitFcardSearch={props.onSubmitFcardSearch}
            resetFcardQuesSearch={props.resetFcardQuesSearch}
            />

        </div>
    )
}

export default Options
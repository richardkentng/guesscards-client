import React, {useEffect} from 'react'
import SearchBar from './SearchBar'
import { toast } from 'react-toastify'

function Options(props) {

    useEffect(() => {
        document.querySelector('.btn-sort-new').disabled = true
        if ('sort' in localStorage) {
            const btnSort = document.querySelector(`.${localStorage.sort}`)
            if (btnSort) btnSort.click()
        }
    }, [])


    function toggleDisabled(e) {
        //ensure that target is a button (because buttons have a class that describes their sort type)
        let btnClicked = e.target
        while (btnClicked.localName !== 'button') {
            btnClicked = btnClicked.parentElement
        }

        //set 'sort' in localStorage (exclude marked)
        if (!btnClicked.classList.contains('btn-sort-mark')) {
            let btnSortClass
            btnClicked.classList.forEach(c => {
                if (c.includes('btn-sort-')) btnSortClass = c
            })
            if (!btnSortClass) return toast.error(`Could not find class with "btn-sort-" from clicked target.
            LocalStorage did not store a value for "sort"`)
            localStorage.setItem('sort', btnSortClass)
        }

        //disable clicked button (exluding button.btn-sort-mark)
        //enable other buttons
        const btns = document.querySelectorAll('.btn-sort')
        btns.forEach(btn => {
            //ignore btn-sort-mark button
            if (!btn.classList.contains('btn-sort-mark')) {
                if (btn === btnClicked) {
                    if (btn.classList.contains('btn-sort-rand')) btn.style.opacity = '0.5'
                    else { btn.disabled = true }
                }
                else if (btn.classList.contains('btn-sort-rand')) btn.style.opacity = '1'
                else { btn.disabled = false }
            }
        })
    }

    return (
        <div className="FlashCard Options "
        style={{display: props.numCards >= 2 ? 'block' : 'none'}}
        >
            <button 
                onClick={(e) => {
                    props.sortByRandom()
                    toggleDisabled(e)
                }}
                className="btn-sort btn-sort-rand" 
                >
                Rand
            </button>
            <button
                onClick={(e) => {
                    props.sortByCreatedAt('desc')
                    toggleDisabled(e)
                }}
                className="btn-sort btn-sort-new"
                >
                New
            </button>
            <button
                onClick={(e) => {
                    props.sortByCreatedAt('asc')
                    toggleDisabled(e)
                }}
                className="btn-sort btn-sort-old" 
                >
                Old
            </button>
            <button
                onClick={(e) => {
                    props.sortByMarked()
                    toggleDisabled(e)
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
            />

        </div>
    )
}

export default Options
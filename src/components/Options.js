import React, {useEffect} from 'react'

function Options(props) {

    function sortByNewFirst() { props.sortByCreatedAt('desc') }
    function sortByOldFirst() { props.sortByCreatedAt('asc') }


    useEffect(() => {
        document.querySelector('.btn-sort-new').disabled = true
        if ('sort' in localStorage) {
            const btnSort = document.querySelector(`.${localStorage.sort}`)
            if (btnSort) btnSort.click()
        }
    }, [])

    function toggleDisabled(target) {
        //remember sort in localStorage
        const classList = target.getAttribute('class').split(' ')
        const clas = classList.find(c => c.includes('btn-sort-'))
        localStorage.setItem('sort', clas)

        //toggleDisabled
        const btns = document.querySelectorAll('.btn-sort')
        btns.forEach(btn => {
            if (btn === target) {
                if (btn.classList.contains('btn-sort-rand')) btn.style.opacity = '0.5'
                else { btn.disabled = true }
            }
            else if (btn.classList.contains('btn-sort-rand')) btn.style.opacity = '1'
            else { btn.disabled = false }
        })
        if (!props.numMarked) document.querySelector('.btn-sort-mark').disabled = true
    }

    return (
        <div className="FlashCard Options "
        style={{display: props.numCards >= 2 ? 'block' : 'none'}}
        >
            <button 
                onClick={(e) => {
                    props.sortByRandom()
                    toggleDisabled(e.target)
                }}
                className="btn-sort btn-sort-rand gray-72" 
                >
                Random
            </button>
            <button
                onClick={(e) => {
                    sortByNewFirst()
                    toggleDisabled(e.target)
                }}
                className="btn-sort btn-sort-new gray-72"
                >
                Newest
            </button>
            <button
                onClick={(e) => {
                    sortByOldFirst()
                    toggleDisabled(e.target)
                }}
                className="btn-sort btn-sort-old gray-72" 
                >
                Oldest
            </button>
            <button
                onClick={(e) => {
                    props.sortByMarked()
                    toggleDisabled(e.target)
                }}
                className="btn-sort btn-sort-mark gray-72"
                disabled={ props.numMarked ? false : true }
                >
                Marked <span className="red-num-marked">{props.numMarked > 0 ? props.numMarked : ''}</span>
            </button>

        </div>
    )
}

export default Options
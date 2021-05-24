import React from 'react'

function Options(props) {

    function sortByNewFirst() { props.sortByCreatedAt('desc') }
    function sortByOldFirst() { props.sortByCreatedAt('asc') }

    return (
        <div className="FlashCard Options "
        style={{display: props.numCards >= 5 ? 'block' : 'none'}}
        >
            <button 
                onClick={props.randomize}
                className="gray-72" 
                >
                Random
            </button>
            <button
                onClick={sortByNewFirst}
                className="gray-72" 
                >
                Newest
            </button>
            <button
                onClick={sortByOldFirst}
                className="gray-72" 
                >
                Oldest
            </button>

        </div>
    )
}

export default Options
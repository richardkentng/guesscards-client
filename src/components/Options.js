import React from 'react'

function Options(props) {

    return (
        <div className="FlashCard Options "
        style={{display: props.numCards >= 5 ? 'block' : 'none'}}
        >
            <button 
            className="btn-rand"
            onClick={props.randomize} 
            >
            Randomize
            </button>

        </div>
    )
}

export default Options
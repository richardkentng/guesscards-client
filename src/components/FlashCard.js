import React from 'react'

function FlashCard(props) {
    return (
        <div className="FlashCard">
            <p>{props.ques}</p>
            <p>{props.ans}</p>
        </div>
    )
}

export default FlashCard

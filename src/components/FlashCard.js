import React from 'react'

function FlashCard(props) {

    const flashcardDelete = () => {
        props.flashcardDelete(props._id)
    }
    
    return (
        <div className="FlashCard">
            <p>{props.ques}</p>
            <p>{props.ans}</p>
            <p>{props._id}</p>

            <button onClick={flashcardDelete} className="btn-del-fcard hover-to-see">
                <i className="material-icons">delete</i>
            </button>
        </div>
    )
}

export default FlashCard

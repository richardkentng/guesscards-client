import React from 'react'
import colors from '../partials/colors'

function OptionsBottom(props) {

    const hideAnswers = () => {
        const contFcardEls = document.querySelectorAll('.cont-FlashCard')
        contFcardEls.forEach(contFcard => {
            if (contFcard.style.backgroundColor === colors.yellowRevealed) {
                contFcard.querySelector('.ques-ans').click()
            }
        })
    }

    return (
        <div 
            className="FlashCard Options"
            style={{ display: props.numAnswersShown ? 'block' : 'none' }}
        >
            <button 
                onClick={hideAnswers}
                className="gray-72"
                >
                Hide Answers
            </button>
        </div>
    )
}

export default OptionsBottom

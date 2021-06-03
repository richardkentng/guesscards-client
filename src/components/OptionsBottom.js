import React from 'react'
import colors from '../partials/colors'
import img_src_arrow_up from '../images/arrow_up_20.png'

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
            style={{ display: props.numCards >= 2 ? 'block' : 'none' }}
        >
            <button 
                onClick={hideAnswers}
                className="gray-72"
                disabled={props.numAnswersShown > 0 ? false : true }
                >
                Hide {props.numAnswersShown} Answers
            </button>

            <a href="#navbar" className="a-scroll-to-top">
                <img src={img_src_arrow_up} alt="arrow up"/>
            </a>
        </div>
    )
}

export default OptionsBottom

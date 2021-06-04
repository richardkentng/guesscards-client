import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import colors from '../partials/colors'
import img_src_arrow_up from '../images/arrow_up_20.png'

function OptionsBottom(props) {

    let setTimeoutInProgress = false

    function trackBtnBackPosition() {

        if (!setTimeoutInProgress) {
            setTimeout(() => {
                trackBtnBackPosition()
                setTimeoutInProgress = false
            }, 300)
            setTimeoutInProgress = true
        }

        const btnBackToSets = document.querySelectorAll('.btn-back-to-sets')
        const btnBackToSet1 = btnBackToSets[0]
        const btnBackToSet2 = btnBackToSets[1]
        const aLinkScrollToTop = document.querySelector('.a-scroll-to-top')
        const btn1pos = btnBackToSet1.getBoundingClientRect()
        
        //if button.btn-back-to-sets vanishes from view, show 2 buttons in OptionsBottom
        if (btn1pos.top < -1 * btn1pos.height) {
            btnBackToSet2.style.display = 'flex'
            aLinkScrollToTop.style.display = 'inline-block'
            setTimeout(() => {
                aLinkScrollToTop.style.opacity = '1'
                btnBackToSet2.style.opacity = '1'
            })
        }
    }

    useEffect(() => {
        window.addEventListener('wheel', trackBtnBackPosition)
        return () => {
            window.removeEventListener('wheel', trackBtnBackPosition)
        }
    }, [])

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
            className="OptionsBottom"
            style={{ display: props.numCards >= 2 ? 'block' : 'none' }}
        >
            <div className="cont-options-bottom">
                {/* button - back to sets */}
                <div className="btn-back-to-sets" onClick={() => { props.history.push('/sets') }}>
                    <div className="arrow-left"></div>
                </div>

                <div className="cont-other-btns">
                    {/* button - hide answers */}
                    <button 
                        onClick={hideAnswers}
                        className="gray-72"
                        disabled={props.numAnswersShown > 0 ? false : true }
                        >
                        Hide {props.numAnswersShown} Answers
                    </button>
        
                    {/* anchor link - scroll to very top */}
                    <a href="#navbar" className="a-scroll-to-top">
                        <img src={img_src_arrow_up} alt="arrow up"/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default withRouter(OptionsBottom)

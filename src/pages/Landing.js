import React from 'react'
import {Link} from 'react-router-dom'
import step1 from '../images/step1.png'
import step2 from '../images/step2.png'
import step3 from '../images/step3.png'
import step4 from '../images/step4.png'
import step5 from '../images/step5.png'
import step6 from '../images/step6.png'
import { userState } from '../recoil/atom'
import {useRecoilValue} from 'recoil'

function Landing(props) {
    const user = useRecoilValue(userState)

    /* redirect elsewhere if:  
        1 - user is logged in   
        2 - did not click icon to reach landing page 
        3 - did not click logout to reach langing page
    */
    const secondsSinceClickedGusscardsIcon = (Date.now() - localStorage.timeClickedGuesscardsIcon) / 1000
    const secondsSinceClickedLogOut = (Date.now() - localStorage.timeClickedLogOut) / 1000
    
    if (user && secondsSinceClickedGusscardsIcon > 0.1 && secondsSinceClickedLogOut > 0.1) {
        if (localStorage.page === "SetShow" && localStorage.setId !== '') {
            props.history.push(`/sets/${localStorage.setId}`)
        } else if (localStorage.page === "SetContainer") {
            props.history.push('/sets')
        }
    }

    return (
        <>
            <div className="Landing-header">
                <h1>GUESSCARDS!</h1>
                <p><i>Flashcards made easy!</i></p>
            </div>
            
            <iframe className="iframe" width="560" height="315" src="https://www.youtube.com/embed/oKJtFcHQ3MM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

            <div className="Landing-grid">
                <section>
                <p>1 Create a set.</p>
                <img src={step1} alt="step1"/>
                </section>

                <section>
                <p>2 Create a flashcard.</p>
                <img src={step2} alt="step2"/>
                </section>

                <section>
                <p>3 Guess the answer!</p>
                <img src={step3} alt="step3"/>
                </section>

                <section>
                <p>4 Click to see your answer!</p>
                <img src={step4} alt="step4"/>
                </section>

                <section>
                <p>Create more and more flashcards!</p>
                <img src={step5} alt="step5"/>
                </section>

                <section>
                <p>And easily view all your sets!</p>
                <img src={step6} alt="step6"/>
                </section>

                <section>
                <p>Sound easy?  <Link to="/signup">Sign Up!</Link></p>
                </section>
            </div>
        </>
    )
}

export default Landing

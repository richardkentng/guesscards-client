import React, {useState} from 'react'
import FormFlashcardEdit from './FormFlashcardEdit'
import colors from '../partials/colors'

function FlashCard(props) {
    const [styleFlashCard, setStyleFlashCard] = useState({display: 'block'})
    const [styleFlashCardeForm, setStyleFlashCardeForm] = useState({display: 'none'})
    const [styleAns, setStyleAns] = useState({display: 'none'})

    const flashcardDelete = () => {
        props.handleFlashcardDelete(props._id)
    }

    /********************************************* 
                FUNCTIONS  to TOGGLE DISPLAY
    *********************************************/
    
    const toggleDisplayCardvsEditForm = () => {
        //hide/show flashcard
        setStyleFlashCard(toggleBlockNone(styleFlashCard))
        //hide/show flashcard's edit form
        setStyleFlashCardeForm(toggleBlockNone(styleFlashCardeForm))
    }

    const toggleDisplayAns = () => {
        setStyleAns(toggleBlockNone(styleAns))
        setStyleFlashCard(toggleYellow(styleFlashCard))
        setTimeout(() => { props.updateNumAnswersShown() }, 50)
    }
    
    /********************************************* 
                FUNCTIONS to EDIT STYLE OBJECT
    *********************************************/
    

    const toggleBlockNone = (styleObj) => {
        const updateStyleObj = {...styleObj}
        updateStyleObj.display = styleObj.display === 'block' ?
        'none' : 'block'
        return updateStyleObj
    }

    const toggleYellow = (styleObj) => {
        const updatedStyle = {...styleObj}
        if (updatedStyle.backgroundColor !== colors.yellowRevealed) {
            updatedStyle.backgroundColor = colors.yellowRevealed
        }
        else updatedStyle.backgroundColor = 'white'
        return updatedStyle
    }

    /********************************************* 
                        RETURN
    *********************************************/
    return (
        <>
        <div className="cont-FlashCard" style={styleFlashCard} id={props._id}>
            <div className="aFlashCard">
                <div 
                className={`cont-mark ${props.marked && 'bgr'}`}
                onClick={() => { 
                    props.flashcardEdit({...props, marked: props.marked ? false : true}) 
                }}
                >

                </div>

                <div className="ques-ans" onClick={toggleDisplayAns}>
                    {props.score ?
                    (
                        <>
                            {[].concat(props.queryIndexes.map(([idx1, idx2, match, space]) => {
                                    return (
                                    <>
                                    <span 
                                        className={match === 'match' && 'query-match'}>
                                        {props.ques.substring(idx1, idx2)}
                                    </span>
                                    {space === 'space' && <> </>}
                                    </>
                                    )
                            }))}
                        </>
                    ) 
                    :
                    <p>{props.ques}</p>
                    }
                    <p style={styleAns}>{props.ans}</p>
                </div>
    
                <div className="btn-edit-btn-del">
                    <button onClick={toggleDisplayCardvsEditForm} className="btn-edit-fcard hover-to-see">
                        <i className="material-icons">edit</i>
                    </button>
                    <button onClick={flashcardDelete} className="btn-del-fcard hover-to-see">
                        <i className="material-icons">delete</i>
                    </button>
                </div>

            </div>
        </div>

        <FormFlashcardEdit 
        {...props}
        flashcardEdit={props.flashcardEdit}
        styleFlashCardeForm={styleFlashCardeForm}
        toggleDisplayCardvsEditForm={toggleDisplayCardvsEditForm}
        />

        </>
    )
}

export default FlashCard

import React, {useState} from 'react'
import FormFlashcardEdit from './FormFlashcardEdit'

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

    const yellowish = '#ffec84'
    const toggleYellow = (styleObj) => {
        const updatedStyle = {...styleObj}
        if (updatedStyle.backgroundColor !== yellowish) updatedStyle.backgroundColor = yellowish
        else updatedStyle.backgroundColor = 'white'
        return updatedStyle
    }

    /********************************************* 
                        RETURN
    *********************************************/
    return (
        <>
        <div className="FlashCard" style={styleFlashCard} id={props._id}>
            <div className="aFlashCard">
                <div className="ques-ans" onClick={toggleDisplayAns}>
                    <p>{props.ques}</p>
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

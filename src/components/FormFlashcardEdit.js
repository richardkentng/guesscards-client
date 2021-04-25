import React, {useState} from 'react'
import { toast } from 'react-toastify'


function FormFlashcardEdit(props) {

    const [ques, setQues] = useState(props.ques)
    const [ans, setAns] = useState(props.ans)

    const onSubmit = (e) => {
        e.preventDefault()
        if (!ques || !ans) return toast.warn('Please fill out both fields!')
        const updateCard = {...props}
        updateCard.ques = ques
        updateCard.ans = ans
        props.flashcardEdit(updateCard)
        props.toggleDisplayCardvsEditForm()
    }

    return (
        <form onSubmit={onSubmit} className="form-flashcard-edit FlashCard" style={props.styleFlashCardeForm}>
            <div className="ques-cancel">
                <textarea 
                type="text"
                name="ques"
                value={ques}
                onChange={(e) => setQues(e.target.value)}
                placeholder="question"
                autoFocus={true}
                />

                <button 
                type="button" 
                tabIndex="-1"
                onClick={props.toggleDisplayCardvsEditForm}
                >
                    <i className="material-icons">cancel</i>
                </button>

            </div>

            <div className="ans-save">
                <textarea 
                type="text"
                name="ans"
                value={ans}
                onChange={(e) => setAns(e.target.value)}
                placeholder="answer"
                />
                <button type="submit">Save</button>
            </div>
        </form>
    )
}

export default FormFlashcardEdit
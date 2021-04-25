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
        <form onSubmit={onSubmit} className="FlashCard" style={props.styleFlashCardeForm}>
            <textarea 
            type="text"
            name="ques"
            value={ques}
            onChange={(e) => setQues(e.target.value)}
            placeholder="question"
            className="input-edit-fcard"
            autoFocus={true}
            />

            <textarea 
            type="text"
            name="ans"
            value={ans}
            onChange={(e) => setAns(e.target.value)}
            placeholder="answer"
            className="input-edit-fcard"
            />

            <button type="submit" className="btn-save-edit-fcard">Save</button>
        </form>
    )
}

export default FormFlashcardEdit
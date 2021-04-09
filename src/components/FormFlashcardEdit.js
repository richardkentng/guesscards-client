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
    }

    return (
        <form onSubmit={onSubmit} className="FlashCard" style={{backgroundColor: "#ddd"}}>
                <textarea 
                type="text"
                name="ques"
                value={ques}
                // autoFocus={true}
                onChange={(e) => setQues(e.target.value)}
                placeholder="question"
                className="input-edit-fcard"
                />

                <textarea 
                type="text"
                name="ans"
                value={ans}
                onChange={(e) => setAns(e.target.value)}
                placeholder="answer"
                className="input-edit-fcard"
                />

            <button type="submit"><i className="material-icons">save</i></button>
            {/* <button type="button"><i className="material-icons">cancel</i></button> */}
        </form>
    )
}

export default FormFlashcardEdit
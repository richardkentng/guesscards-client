import React, {useState} from 'react'
import { toast } from 'react-toastify'
// import SetModel from '../models/set'

function FormFlashcardCreate(props) {

    const [ques, setQues] = useState("")
    const [ans, setAns] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        if (!ques || !ans) return toast.warn('Please fill out both fields!')
        props.flashcardCreate({ques, ans})
        setQues('')
        setAns('')
    }

    return (
        <form onSubmit={onSubmit} className="FlashCard" style={{backgroundColor: "silver"}}>
            <div>
                <input 
                type="text"
                name="ques"
                value={ques}
                placeholder="question"
                autoFocus={true}
                onChange={(e) => setQues(e.target.value)}
                />
            </div>

            <div>
                <input 
                type="text"
                name="ans"
                value={ans}
                placeholder="answer"
                onChange={(e) => setAns(e.target.value)}
                />
            </div>

            <button type="submit">Create Flashcard</button>
        </form>
    )
}

export default FormFlashcardCreate
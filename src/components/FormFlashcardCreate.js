import React from 'react'
import { toast } from 'react-toastify'
// import SetModel from '../models/set'

class FormFlashcardCreate extends React.Component {

    state = {
        ques: '',
        ans: ''
    }
    // const [ques, setQues] = useState("")
    // const [ans, setAns] = useState("")
    // componentDidMount() {
    //     const formNewFcardEl = document.querySelector('.form-new-fcard')
    //     formNewFcardEl.addEventListener('keydown', this.onEnter)
    // }
    // componentWillUnmount() {
    //     const formNewFcardEl = document.querySelector('.form-new-fcard')
    //     formNewFcardEl.removeEventListener('keydown', this.onEnter)
    // }
    
    // onEnter(e) {
    //     if (e.key === "Enter") {
    //         e.preventDefault()
    //         console.log('u press enter');
    //         const inputNewQuesEl = document.querySelector('.new-ques')
    //         const inputNewAnsEl = document.querySelector('.new-ans')
    //     }
    // }

    onSubmit = (e) => {
        e.preventDefault()
        if (!this.state.ques || !this.state.ans) return toast.warn('Please fill out both fields!')
        this.props.flashcardCreate({ques: this.state.ques, ans: this.state.ans})
        this.setState({
            ques: '',
            ans: ''
        })
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} className="FlashCard form-new-fcard" style={{backgroundColor: "silver"}}>
                <div>
                    <input 
                    placeholder="question"
                    type="text"
                    value={this.state.ques}
                    autoFocus={true}
                    onChange={(e) => this.setState({ques: e.target.value})}
                    className="new-ques"
                    />
                </div>

                <div>
                    <input 
                    placeholder="answer" 
                    type="text"
                    value={this.state.ans}
                    onChange={(e) => this.setState({ans: e.target.value})}
                    className="new-ans"
                    />
                </div>

                <button type="submit">Create Flashcard</button>
            </form>
        )
    }
}

export default FormFlashcardCreate
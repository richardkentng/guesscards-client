import React from 'react'
// import SetModel from '../models/set'

class FormFlashcardCreate extends React.Component {

    state = {
        ques: '',
        ans: ''
    }

    // control flow for "keydown" of enter.  
    // focuses fields and pulses them red based on which fields are empty.
    componentDidMount() {
        document.querySelector('.form-new-fcard')
        .addEventListener('keydown', this.onEnter)
    }
    componentWillUnmount() {
        document.querySelector('.form-new-fcard')
        .removeEventListener('keydown', this.onEnter)
    }
    onEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            const inputNewQuesEl = document.querySelector('.new-ques')
            const inputNewAnsEl = document.querySelector('.new-ans')
            const {ques, ans} = this.state
            const activeEl = document.activeElement
            // flip between empty fields for question and answer
            if (!ques && !ans) {
                if (activeEl === inputNewAnsEl) {
                    return inputNewQuesEl.focus()
                } else if (activeEl === inputNewQuesEl) {
                    return inputNewAnsEl.focus()
                }
            }
            // focus empty field.  if already focused, pulse it red as well
            if (!ques) {
                if (activeEl === inputNewQuesEl) this.pulseRed(inputNewQuesEl)
                return inputNewQuesEl.focus()
            } else if (!ans) {
                if (activeEl === inputNewAnsEl) this.pulseRed(inputNewAnsEl)
                return inputNewAnsEl.focus()
            }
            this.onSubmitCreateFcard(e)
        }
    }

    onSubmitCreateFcard = (e) => {
        e.preventDefault()

        // ensure fields are not empty
        const {ques, ans} = this.state
        const inputNewQuesEl = document.querySelector('.new-ques')
        const inputNewAnsEl = document.querySelector('.new-ans')
        if (!ques) {
            this.pulseRed(inputNewQuesEl)
            return inputNewQuesEl.focus()
        } else if (!ans) {
            this.pulseRed(inputNewAnsEl)
            return inputNewAnsEl.focus()
        }
        
        this.props.flashcardCreate({ques: this.state.ques, ans: this.state.ans})
        this.setState({
            ques: '',
            ans: ''
        })
    }

    pulseRed = (el) => {
        el.style.backgroundColor = "pink"
        setTimeout(() => { el.style.backgroundColor = "white"}, 100)
    }
    
    render() {
        return (
            <form onSubmit={this.onSubmitCreateFcard} className="FlashCard form-new-fcard" style={{backgroundColor: "silver"}}>
                <div>
                    <input 
                    placeholder="question"
                    type="text"
                    value={this.state.ques}
                    autoFocus={true}
                    onChange={(e) => this.setState({ques: e.target.value})}
                    className="new-ques w100p"
                    />
                </div>

                <div>
                    <input 
                    placeholder="answer" 
                    type="text"
                    value={this.state.ans}
                    onChange={(e) => this.setState({ans: e.target.value})}
                    className="new-ans w100p"
                    />
                </div>

                <button type="submit" className="w100p gray-72">Create Flashcard</button>
            </form>
        )
    }
}

export default FormFlashcardCreate
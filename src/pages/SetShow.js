import React from 'react'
import { Link } from 'react-router-dom'
import FlashCard from '../components/FlashCard'
import FormFlashcardCreate from '../components/FormFlashcardCreate'

import SetModel from '../models/set'



class SetShow extends React.Component {

    state = {
        set: false
    }

    componentDidMount() {
        SetModel.show(this.props.match.params.id).then(res => {
            console.log('data retreived about this set!:', res.set);
            this.setState({set: res.set})
        })
    }

    flashcardCreate = (body) => {
        SetModel.createFlashcard(this.state.set._id, body).then(res => {
            let updateSet = this.state.set
            updateSet.cards.push(res.card)
            this.setState({set: updateSet})
        })
    }


    render() {
        let uiFlashcards
        if (typeof this.state.set === 'object') {
            uiFlashcards = this.state.set.cards.map((card, idx) => {
                return <FlashCard key={idx} {...card}/>
            })
            if (uiFlashcards.length === 0) {
                uiFlashcards = 'This set has no flashcards  :\'(' 
            }
        }
        return (
            <div>
                <p><Link to="/sets">back to sets</Link></p>

                {/* Set: <set name> (#)
                    <set id>    */}
                {!this.state.set ? 'loading...' 
                : 
                (
                <div>
                <span className="big thin gray">Set:</span> 
                <span className="big-bold"> {this.state.set.name}</span>
                <span className={!this.state.set.cards.length ? "big thin red" : 'big thin gray'}> ({this.state.set.cards.length})</span>
                <div className="gray-a"> ({this.props.match.params.id})</div>
                </div>
                )}

                {/* Form - Create flashcard! */}
                {this.state.set && <FormFlashcardCreate flashcardCreate={this.flashcardCreate}/>}

                {/* show cards! */}
                {uiFlashcards}
            </div>
        )
    }
}

export default SetShow
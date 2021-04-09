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
            this.setState({set: res.set})
        })
    }

    flashcardCreate = (body) => {
        SetModel.createFlashcard(this.state.set._id, body).then(res => {
            const updateSet = this.state.set
            updateSet.cards.push(res.card)
            this.setState({set: updateSet})
        })
    }
    flashcardDelete = (cardId) => {
        SetModel.deleteFlashcard(this.state.set._id, cardId).then(res => {
            const updateSet = this.state.set
            const remainingCards = this.state.set.cards.filter(c => {
                return c._id !== res.card._id
            })
            updateSet.cards = remainingCards
            this.setState({set: updateSet})
        })
    }
    flashcardEdit = (card) => {
        SetModel.editFlashcard(this.state.set._id, card).then(res => {
            console.log('res: ', res);
            const updateSet = this.state.set
            updateSet.cards.splice(res.cardIndex, 1, res.card)
            this.setState(updateSet)
        })
    }


    render() {
        let uiFlashcards
        if (typeof this.state.set === 'object') {
            uiFlashcards = this.state.set.cards.map((card, idx) => {
                return (
                <FlashCard 
                key={idx} 
                {...card}
                flashcardDelete={this.flashcardDelete}    
                flashcardEdit={this.flashcardEdit}    
                />
                )
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
                {this.state.set && 
                <FormFlashcardCreate flashcardCreate={this.flashcardCreate}/>}

                {/* show cards! */}
                {uiFlashcards}
            </div>
        )
    }
}

export default SetShow
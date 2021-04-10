import React from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { toast } from 'react-toastify'

import FlashCard from '../components/FlashCard'
import FormFlashcardCreate from '../components/FormFlashcardCreate'
import SetShowOptions from '../components/SetShowOptions'
import SetModel from '../models/set'

Modal.setAppElement('#root')


class SetShow extends React.Component {

    state = {
        set: false,
        inputSetName: '',
        modalIsOpenEditSet: false
    }

    componentDidMount() {
        SetModel.show(this.props.match.params.id).then(res => {
            this.setState({
                set: res.set,
                inputSetName: res.set.name
            })
        })
    }

    flashcardCreate = (body) => {
        SetModel.createFlashcard(this.state.set._id, body).then(res => {
            const updateSet = this.state.set
            updateSet.cards.unshift(res.card)
            this.setState({set: updateSet})
        })
    }

    flashcardEdit = (card) => {
        SetModel.editFlashcard(this.state.set._id, card).then(res => {
            const updateSet = this.state.set
            updateSet.cards.splice(res.cardIndex, 1, res.card)
            this.setState(updateSet)
        })
    }
    
    flashcardDelete = (cardId) => {
        SetModel.deleteFlashcard(this.state.set._id, cardId).then(res => {
            const updateSet = this.state.set
            updateSet.cards = updateSet.cards.filter(c => {
                return c._id !== res.card._id
            })
            this.setState({set: updateSet})
        })
    }

    onSubmitEditSetName = (e) => {
        e.preventDefault()
        if (!this.state.inputSetName) return toast.warn('You should probably give your set a name...')
        SetModel.edit(this.state.set._id, this.state.inputSetName).then(res => {
            const updateSet = this.state.set
            updateSet.name = res.set.name
            this.setState({
                set: updateSet,
                modalIsOpenEditSet: false
            })
        })
    }

    onSubmitDeleteEntireSet = (e) => {
        e.preventDefault()
        SetModel.delete(this.state.set._id).then(res => {
            if (res.set._id === this.state.set._id) toast.success(`Successfully deleted the set '${this.state.set.name}'`)
            this.props.history.push('/sets')
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
                <div className="header-set-show">
                    <span className="big thin gray">Set:</span> 
                    <span className="big-bold"> {this.state.set.name}</span>
                    <span className={!this.state.set.cards.length ? "big thin red" : 'big thin gray'}> ({this.state.set.cards.length})</span>


                    {/* Button - Modal Trigger to Edit Set! */}
                    <button 
                    onClick={() => this.setState({modalIsOpenEditSet: true})} 
                    className="btn-edit-fcard hover-to-see"
                    >
                    <i className="material-icons">edit</i>
                    </button>

                    <div className="gray-a"> ({this.props.match.params.id})</div>
                </div>
                )}



                {/* Form - Create flashcard! */}
                {this.state.set && 
                <FormFlashcardCreate flashcardCreate={this.flashcardCreate}/>}


                {/* <SetShowOptions/> */}

                {/* show cards! */}
                {uiFlashcards}



                {/************************************************** 
                    MODAL to Edit Set Name or Delete Entire Set 
                ***************************************************/}
                <Modal 
                isOpen={this.state.modalIsOpenEditSet}
                onRequestClose={() => this.setState({modalIsOpenEditSet: false})}
                style={{overlay: {background: 'rgba(0,0,0,0.5)'}}}
                >
                    {/* button to close modal */}
                    <button 
                    style={{float: 'right'}} 
                    onClick={() => this.setState({modalIsOpenEditSet: false})}
                    >
                    <i className="material-icons">cancel</i>
                    </button>

                    {/* form to edit set name */}
                    <label className="gray-a">Edit Set Name:</label>
                    <form onSubmit={this.onSubmitEditSetName} className="form-edit-set">
                        <input
                        type="text"
                        name="name"
                        value={this.state.inputSetName}
                        placeholder="name of set"
                        autoFocus={true}
                        onChange={(e) => {this.setState({inputSetName: e.target.value})}}
                        maxLength="255"
                        />
                        <button type="submit">Save</button>
                    </form>
                    {/* form to delete entire set */}
                    {/* <label className="gray-a">DELETE ENTIRE SET</label> */}
                    <form onSubmit={this.onSubmitDeleteEntireSet} className="form-edit-set">
                        {/* <input
                        type="text"
                        name="name"
                        value={this.state.inputSetName}
                        placeholder="name of set"
                        autoFocus={true}
                        onChange={(e) => {this.setState({inputSetName: e.target.value})}}
                        maxLength="255"
                        /> */}
                        <button type="submit">DELETE ENTIRE SET</button>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default SetShow
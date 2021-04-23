import React from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { toast } from 'react-toastify'

import FlashCard from '../components/FlashCard'
import FormFlashcardCreate from '../components/FormFlashcardCreate'
import SetModel from '../models/set'
import react from 'react'

Modal.setAppElement('#root')


class SetShow extends React.Component {

    state = {
        set: false,
        inputSetNameEdit: '',
        inputSetNameDeleteSet: '',
        modalIsOpenEditSet: false,
        styleBtnDisplayFormDeleteSet: {display: 'block'},
        styleFormDeleteSet: {display: 'none'}
    }

    componentDidMount() {
        SetModel.show(this.props.match.params.id).then(res => {

                if(!Object.keys(res).includes('set')) {
                    toast.warn(res.msg)  
                    return this.props.history.push('/sets')
                } 

                this.setState({
                    set: res.set,
                    inputSetNameEdit: res.set.name
                })
        })


    }

    flashcardCreate = (body) => {
        SetModel.createFlashcard(this.state.set._id, body).then(res => {
            const updateSet = this.state.set
            updateSet.cards.unshift(res.card)
            this.setState({set: updateSet})
            document.querySelector('.new-ques').focus()
        })
    }

    flashcardEdit = (card) => {
        SetModel.editFlashcard(this.state.set._id, card).then(res => {
            const updateSet = this.state.set
            //get index of card to be edited
            let index
            for (let i = 0; i < updateSet.cards.length; i++) {
                if (updateSet.cards[i]._id === card._id) {
                    index = i
                    break
                }
            }
            updateSet.cards.splice(index, 1, res.card)
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
        if (!this.state.inputSetNameEdit) return toast.warn('You should probably give your set a name...')
        SetModel.edit(this.state.set._id, this.state.inputSetNameEdit).then(res => {
            const updateSet = this.state.set
            updateSet.name = res.set.name
            this.setState({
                set: updateSet,
                modalIsOpenEditSet: false
            })
        })
    }

    onSubmitDeleteEntireSet = (e) => {
        if (e) e.preventDefault()
        SetModel.delete(this.state.set._id).then(res => {
            if (res.set._id === this.state.set._id) toast.success(`Successfully deleted the set '${this.state.set.name}'`)
            this.props.history.push('/sets')
        })
    }

    onCloseModalEditSet = () => {
        this.setState({
            modalIsOpenEditSet: false,
            styleBtnDisplayFormDeleteSet: {display: 'block'},
            styleFormDeleteSet: {display: 'none'},
            inputSetNameDeleteSet: '',
            inputSetNameEdit: this.state.set.name
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
        }


        return (
            <div>
                {!this.state.set ? 'loading...' 
                : (
                <>
                <br/>
                <div className="header-set-show">

                    {/* back arrow */}
                        <button className="btn-back-to-sets"><Link to="/sets">
                        <i className="material-icons">arrow_back</i>
                        </Link></button>

                    {/* set title and (#) */}
                    <div className="h1-num">
                        <h1 className="dib"> {this.state.set.name}</h1>
                        <span className={!this.state.set.cards.length ? "big thin red" : 'big thin gray-a'}> ({this.state.set.cards.length})</span>
                    </div>


                    {/* Button - Modal Trigger to Edit Set! */}
                    <button 
                    onClick={() => this.setState({modalIsOpenEditSet: true})} 
                    className="btn-edit-fcard hover-to-see"
                    >
                    <i className="material-icons">edit</i>
                    </button>

                </div>
                </>
                )}


                <div className="SetShow-grid">
                    {/* Form - Create flashcard! */}
                    {this.state.set && 
                    <FormFlashcardCreate flashcardCreate={this.flashcardCreate}/>}
    
                    {/* show cards! */}
                    {uiFlashcards}
                </div>


                {/************************************************** 
                    MODAL to Edit Set Name or Delete Entire Set 
                ***************************************************/}
                <Modal 
                isOpen={this.state.modalIsOpenEditSet}
                onRequestClose={this.onCloseModalEditSet}
                style={{overlay: {background: 'rgba(0,0,0,0.5)'}}}
                >
                    {/* button to close modal */}
                    <button 
                    style={{float: 'right'}} 
                    onClick={this.onCloseModalEditSet}
                    >
                    <i className="material-icons">cancel</i>
                    </button>

                    {/* form to edit set name */}
                    <label className="gray-a">Edit Set Name:</label>
                    <form onSubmit={this.onSubmitEditSetName} className="form-edit-set">
                        <input
                        type="text"
                        name="name"
                        value={this.state.inputSetNameEdit}
                        placeholder="name of set"
                        autoFocus={true}
                        onChange={(e) => {this.setState({inputSetNameEdit: e.target.value})}}
                        maxLength="255"
                        />
                        <button type="submit">Save</button>
                    </form>
                    <br/><br/><br/>


                    {/* button to display form to delete set OR to delete empty set */}
                    <button 
                    className="red"
                    onClick={() => {
                        if (this.state.set.cards.length === 0) this.onSubmitDeleteEntireSet(false)
                        else {
                            this.setState({
                                styleBtnDisplayFormDeleteSet: {display: 'none'},
                                styleFormDeleteSet: {display: 'block'}
                            })
                            const inputEl = document.querySelector('.typetodeleteset')
                            setTimeout(() => {inputEl.focus()}, 25)
                        }
                    }}
                    style={this.state.styleBtnDisplayFormDeleteSet}
                    >
                    DELETE SET
                    </button>


                    {/* form to delete entire set */}
                    <form onSubmit={this.onSubmitDeleteEntireSet} className="form-del-set" style={this.state.styleFormDeleteSet}>
                        {/* delete instructions */}
                        <p className="red">
                            <span className="bold">
                            TO DELETE THIS SET AND ALL ({this.state.set && this.state.set.cards.length}) CARDS,
                            </span> ENTER <span className="black bold">{this.state.set && this.state.set.name}</span>
                            , THEN PRESS DELETE SET
                        {/* input set name in order to delete set */}
                        </p>
                        <input
                        placeholder="name of set"
                        type="text"
                        name="name"
                        className="w100p bold fs16 typetodeleteset"
                        value={this.state.inputSetNameDeleteSet}
                        onChange={(e) => {this.setState({inputSetNameDeleteSet: e.target.value})}}
                        maxLength="255"
                        />
                        <p>
                        {/* button to delete set with at least one flashcard */}
                        <button 
                        type="submit" 
                        className="w100p" 
                        disabled={this.state.set ? (this.state.set.name.toLowerCase() === this.state.inputSetNameDeleteSet.toLowerCase() ? false : true) : true}
                        >
                        DELETE SET
                        </button>
                        </p>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default SetShow
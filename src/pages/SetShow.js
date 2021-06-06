import React from 'react'
import Modal from 'react-modal'

import FlashCard from '../components/FlashCard'
import FormFlashcardCreate from '../components/FormFlashcardCreate'
import Options from '../components/Options'
import OptionsBottom from '../components/OptionsBottom'
import LoadingWheel from '../components/LoadingWheel'
import SetModel from '../models/set'
import colors from '../partials/colors'
import functions from '../partials/functions'
import { toast } from 'react-toastify'

Modal.setAppElement('#root')


class SetShow extends React.Component {

    state = {
        set: false,
        inputSetNameEdit: '',
        inputSetNameDeleteSet: '',
        modalIsOpenEditSet: false,
        styleBtnDisplayFormDeleteSet: {display: 'block'},
        styleFormDeleteSet: {display: 'none'},
        numAnswersShown: 0
    }

    componentDidMount() {
        //update last visited page (for redirection purposes on landing page)
        localStorage.setItem('setId', this.props.match.params.id)
        localStorage.setItem('page', 'SetShow')

        SetModel.show(this.props.match.params.id).then(res => {

                //handle errors from server:
                if(!('set' in res)) {
                    //handle invalid set id response:
                    if ('msg' in res && res.msg === 'Failed to find set by id.') {
                        toast.warn('That set does not exist!')
                        return this.props.history.push('/sets')
                    }
                    functions.handleAuthErrorsWithToasts(res)
                    localStorage.setItem('uid', '')
                    return this.props.history.push('/login')
                } 

                this.setState({
                    set: res.set,
                    inputSetNameEdit: res.set.name
                })
        })


    }

    flashcardCreate = (body) => {
        SetModel.createFlashcard(this.state.set._id, body).then(res => {
            if(!this.checkKeyInRes('card', res)) return
            const set = {...this.state.set}
            set.cards.unshift(res.card)
            this.setState({ set })

            //focus question field for creation form
            document.querySelector('.new-ques').focus()

            // sort flashcards based off last recorded sort choice (sort by newest is not included because it is default)
            if ('sort' in localStorage) {
                if (localStorage.sort === 'btn-sort-old') this.sortByCreatedAt('asc')
                else if (localStorage.sort === 'btn-sort-mark') this.sortByMarked()
                else if (localStorage.sort === 'btn-sort-rand') {
                    //place new flashcard in random location
                    const randIndex = Math.floor(Math.random() * this.state.set.cards.length)
                    const set = {...this.state.set}
                    const card = set.cards.shift()
                    set.cards.splice(randIndex, 0, card)
                    this.setState({ set })
                }
            }

            //make new flashcard temporarily green
            const fCardEl = document.getElementById(res.card._id)
            const green = "#8bdc62"
            fCardEl.style.backgroundColor = green
            setTimeout(() => {
                fCardEl.style.transition = 'background-color 0.5s'
                fCardEl.style.backgroundColor = 'white'
            }, 100)
            
            //if new flashcard appears below viewable screen, show success message
            if (fCardEl.getBoundingClientRect().y > window.innerHeight) {
                toast.success('scroll down to see new flashcard!', { autoClose: 1500 })
            }
        })
    }

    flashcardEdit = (card) => {
        SetModel.editFlashcard(this.state.set._id, card).then(res => {
            if(!this.checkKeyInRes('card', res)) return
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
    
    handleFlashcardDelete = (cardId) => {
        //animate flashcard fade:
        const fCardEl = document.getElementById(cardId)
        const fadeSpeed = "0.08s"
        const red = "#B13E3E"
    
        fCardEl.style.transition = `
        padding ${fadeSpeed}, 
        background-color ${fadeSpeed}, 
        opacity ${fadeSpeed} ease-in
        `
        fCardEl.style.padding = "0"
        fCardEl.style.backgroundColor = red
        fCardEl.style.opacity = "0"
    
        //delete flashcard:
        this.flashcardDelete(cardId)
    }
    
    flashcardDelete = (cardId) => {
        SetModel.deleteFlashcard(this.state.set._id, cardId).then(res => {
            if(!this.checkKeyInRes('card', res)) return
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
            if(!this.checkKeyInRes('set', res)) return
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
            if(!this.checkKeyInRes('set', res)) return
            if (res.set._id === this.state.set._id) toast.success(`Successfully deleted the set '${this.state.set.name}'`)
            this.props.history.push('/sets')
        })
    }

    checkKeyInRes = (key, res) => {
        if(!(key in res)) {
            functions.handleAuthErrorsWithToasts(res)
            this.props.history.push('/login')
            localStorage.uid = ''
            return false
        }
        return true
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

    sortByRandom = () => {
        const set = {...this.state.set}
        set.cards.sort((a,b) => Math.random() - 0.5)
        this.setState({ set })
    }
    sortByCreatedAt = (order) => {
        const set = {...this.state.set}
        set.cards.sort((b, a) => {
            const aa = order === 'desc' ? 0 : -1
            const bb = order === 'desc' ? -1 : 0
            function getTime(str) { return new Date(str).getTime()}
            return (getTime(a.createdAt) > getTime(b.createdAt)) ? aa : bb
        })
        this.setState({ set })
    }
    sortByMarked = () => {
        const set = {...this.state.set}
        const markedCards = []
        for (let i = 0; i < set.cards.length; i++) {
            if (set.cards[i].marked === true) {
                markedCards.push(set.cards.splice(i, 1)[0])
                i--
            }
        }
        set.cards = markedCards.concat(set.cards)
        this.setState({ set })
    }

    onClickBackArrow = () => {
        this.props.history.push('/sets')
    }

    updateNumAnswersShown = () => {
        let numAnswersShown = 0

        const contFcardEls = document.querySelectorAll('.cont-FlashCard')
        contFcardEls.forEach(contFcard => {
            if (contFcard.style.backgroundColor === colors.yellowRevealed) {
                numAnswersShown++
            }
        })
        
        this.setState({ numAnswersShown })
    }

    onSubmitFcardSearch = (query) => {
        // console.log('============================SEARCH query: ', query);
        const set = {...this.state.set}
        let numCardMatches = 0
        const arrQuery = strToArr(query)

        //calculate score for each card based off it's match to query
        set.cards.forEach(card => {
            // console.log('-------------------CARD ques: ', card.ques);
            card.score = 0
            card.queryIndexes = []
            if (query.toLowerCase().trim() === card.ques.toLowerCase().trim()) { //check for perfect match
                card.score = 9999
                card.queryIndexes = [[0, card.ques.length, 'match', 'no-space']]
            } else { //check for whole-word match
                const arrQues = strToArr(card.ques)
                arrQues.forEach(qWord => {
                    // console.log('-----word: ', qWord);
                    if (arrQuery.includes(qWord)) { //whole-word matching
                        const indexQwordInQues = card.ques.toLowerCase().indexOf(qWord)
                        card.queryIndexes.push([indexQwordInQues, indexQwordInQues + qWord.length, 'match', 'space'])
                        // console.log('1 push.  whole word match. queryIndexes: ', card.queryIndexes);
                        card.score += qWord.length
                    } else { //check for best partial match (length > 1)
                        const arrPartialMatchesSwordInQword = []
                        arrQuery.forEach(sWord => {
                            const indexOfSwordInQword = qWord.indexOf(sWord)
                            if (indexOfSwordInQword >= 0) arrPartialMatchesSwordInQword.push([sWord.length, indexOfSwordInQword])
                        })
                        if (arrPartialMatchesSwordInQword.length && arrPartialMatchesSwordInQword[0][0] > 1) { //use partial match
                            arrPartialMatchesSwordInQword.sort((a, b) => b[0] - a[0])

                                const indexOfSwordInQword = arrPartialMatchesSwordInQword[0][1]
                                const indexQwordInQues = card.ques.toLowerCase().indexOf(qWord)
                                        card.queryIndexes.push([indexQwordInQues, indexQwordInQues + indexOfSwordInQword, 'no-match', 'no-space'])
                                        card.queryIndexes.push([indexQwordInQues + indexOfSwordInQword, indexQwordInQues + indexOfSwordInQword + arrPartialMatchesSwordInQword[0][0], 'match', 'no-space'])
                                        card.queryIndexes.push([indexQwordInQues + indexOfSwordInQword + arrPartialMatchesSwordInQword[0][0], indexQwordInQues + qWord.length, 'no-match', 'space'])
                                        // console.log('3 push.  partial non-beginning match. queryIndexes: ', card.queryIndexes);
                                        card.score += arrPartialMatchesSwordInQword[0][0]/2
                        } else { //no matches (neither whole word or partial match)
                            const indexQwordInQues = card.ques.toLowerCase().indexOf(qWord)
                            card.queryIndexes.push([indexQwordInQues, indexQwordInQues + qWord.length, 'no-match', 'space'])
                            // console.log('1no-match-push. queryIndexes: ', card.queryIndexes);
                        }
                    }
                })
            }
            if (card.score) numCardMatches ++
        })

        function strToArr(str) {
            return str.toLowerCase().replace(/\s{2,}/g, ' ').trim().split(' ')
        }

        this.setState({ set })

        //show success message & sort cards, or show no-matches message
        if (numCardMatches) {
            set.cards.sort((a, b) => b.score - a.score)
            // enable sort buttons (exclude button.btn-sort-mark)
            document.querySelectorAll('.btn-sort').forEach(btn => { 
                if (btn.classList.contains('btn-sort-rand')) btn.style.opacity = 1
                else if (!btn.classList.contains('btn-sort-mark')) btn.disabled = false 
            })
        }
        else toast.error('no matches!', {autoClose: 1500})
    }

    clearFcardSearch = () => {
        const set = {...this.state.set}
        set.cards.forEach(card => card.score = 0)
        this.setState({ set })
    }

    render() {
        
        let uiFlashcards
        let numMarked
        if (typeof this.state.set === 'object') {
            uiFlashcards = this.state.set.cards.map((card, idx) => {
                return (
                <FlashCard 
                key={card._id} 
                {...card}
                handleFlashcardDelete={this.handleFlashcardDelete}    
                flashcardEdit={this.flashcardEdit}
                updateNumAnswersShown={this.updateNumAnswersShown}
                />
                )
            })
            numMarked = this.state.set.cards.filter(c => c.marked === true).length
        }
        
        return (
            <div>
                {this.state.set === false ? <LoadingWheel/>
                : 
                    <>
                    <br/>
                    <div className="header-set-show">
                        {/* back arrow - see all sets */}
                        <div className="btn-back-to-sets" onClick={this.onClickBackArrow}>
                            <div className="arrow-left"></div>
                        </div>

                        {/* set's title and (#) */}
                        <div className="cont-setName-numCards">
                            <h1 className="dib setTitle"> 
                                {this.state.set.name}
                                <span className={!this.state.set.cards.length ? "big thin red" : 'big thin gray-a'}> ({this.state.set.cards.length})</span>
                            </h1>
                        </div>

                        {/* button - Modal Trigger to Edit Set */}
                        <div>
                            <button 
                                onClick={() => this.setState({modalIsOpenEditSet: true})}
                                className="btn-edit-set hover-to-see" 
                                >
                                <i className="material-icons">edit</i>
                            </button>
                        </div>
                    </div>

                    <div className="SetShow-grid">
                        {/* Form - Create flashcard! */}
                        <FormFlashcardCreate 
                        flashcardCreate={this.flashcardCreate}
                        />
                        
                        <Options 
                        sortByRandom={this.sortByRandom}
                        sortByCreatedAt={this.sortByCreatedAt}
                        sortByMarked={this.sortByMarked}
                        numCards={this.state.set.cards.length}
                        numMarked={numMarked}
                        onSubmitFcardSearch={this.onSubmitFcardSearch}
                        clearFcardSearch={this.clearFcardSearch}
                        />
                        
                        {/* show flashcards! */}
                        {uiFlashcards}

                        <OptionsBottom
                            numAnswersShown={this.state.numAnswersShown}
                            numCards={this.state.set.cards.length}
                        />
                    </div>
                    </>
                }


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
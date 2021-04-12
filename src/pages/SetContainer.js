import React, {useState, useEffect} from 'react'

import SetModel from '../models/set'
import FormSetCreate from '../components/FormSetCreate'
import SetCard from '../components/SetCard'

function SetContainer(props) {

    const [sets, setSets] = useState(false)

    const setCreate = (name) => {
        SetModel.create({name}).then(res => {
            props.history.push(`/sets/${res.set._id}`)
        })
    }

    useEffect(() => {
        SetModel.all().then(data => {
            setSets(data.sets)
        })
    }, [])

    let uiSets
    if (typeof sets === 'object') {
        uiSets = sets.map((set, idx) => {
            const numCards = set.cards.length
            return <SetCard key={idx} {...set} numCards={numCards}/>
        })
    }

    return (
        <div className="SetCont-grid">
            <FormSetCreate setCreate={setCreate}/>
            {!sets ? 'loading...' : (sets.length ? uiSets : '')}
        </div>
    )
}


export default SetContainer
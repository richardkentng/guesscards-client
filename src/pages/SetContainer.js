import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import SetModel from '../models/set'

import FormSetCreate from '../components/FormSetCreate'
import SetCard from '../components/SetCard'

function SetContainer(props) {

    const [sets, setSets] = useState(false)

    const setCreate = (name) => {
        SetModel.create({name}).then(res => {
            // console.log('Client received response when trying to create set: ', res);
            setSets([...sets, res.set])
        })
    }

    useEffect(() => {
        SetModel.all().then(data => {
            // console.log('from client. DATA RECEIVED from get request to domain/sets:', data.sets);
            setSets(data.sets)
        })
    }, [])

    let uiSets
    if (typeof sets === 'object') {
        uiSets = sets.map((set, idx) => {
            const numCards = set.cards.length
            return (
            <Link key={idx} to={`/sets/${set._id}`}>
                <SetCard name={set.name} numCards={numCards}/>
            </Link>
            )
        })
    }


    return (
        <div>
            <FormSetCreate setCreate={setCreate}/>
            {!sets ? 'loading...' : (sets.length ? uiSets : 'You have no sets.   Don\'t worry, create a  new set of cards now!')}
        </div>
    )
}


export default SetContainer
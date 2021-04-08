import React, {useState, useEffect} from 'react'
import SetModel from '../models/set'
export default function SetContainer(props) {

    const [sets, setSets] = useState(false)

    useEffect(() => {
        SetModel.all().then(data => {
            // console.log('from client. DATA RECEIVED from get request to domain/sets:', data.sets);
            setSets(data.sets)
        })
    }, [])

    let uiSets
    if (typeof sets === 'object') {
        uiSets = sets.map((set, idx) => {
            return <div key={idx}>{set.name}</div>
        })
    }


    return (
        <div>
            {!sets ? 'loading...' : (sets.length ? uiSets : 'You have no sets.   Don\'t worry, create a  new set of cards now!')}
        </div>
    )
}

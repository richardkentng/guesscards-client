import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import SetModel from '../models/set'



function SetShow(props) {

    const [setName, setSetName] = useState('')
    const [cards, setCards] = useState([])


    useEffect(() => {
        SetModel.show(props.match.params.id).then(res => {
            console.log('client. data received after making get request to sepecific set: ',res.set)
            setSetName(res.set.name)
        })
    }, [])


    return (
        <div>
            <p><Link to="/sets">back to sets</Link></p>

            {/* Set: <set name> 
                <set id>    */}
            <div>
                <span className="big thin gray">Set:</span> 
                <span className="big-bold"> {setName}</span>
                <div className="gray-a"> ({props.match.params.id})</div>
            </div>

        </div>
    )
}

export default SetShow
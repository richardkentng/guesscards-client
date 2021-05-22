import React, {useState, useEffect} from 'react'

import SetModel from '../models/set'
import FormSetCreate from '../components/FormSetCreate'
import SetCard from '../components/SetCard'
import LoadingWheel from '../components/LoadingWheel'
import {userState} from '../recoil/atom'
import {useSetRecoilState} from 'recoil'
import { toast } from 'react-toastify'

function SetContainer(props) {

    const [sets, setSets] = useState(false)
    const setUser = useSetRecoilState(userState)

    const setCreate = (name) => {
        SetModel.create({name}).then(res => {
            props.history.push(`/sets/${res.set._id}`)
        })
    }

    useEffect(() => {
        //update last visited page (for redirection purposes on landing page)
        localStorage.setItem('page', 'SetContainer')

        SetModel.all().then(data => {

            //handle errors like expired token
            if (!('sets' in data)) {
                if ('msg' in data && data.msg === "token does not exist in middleware") toast.warn('You must be logged in to access that route!')
                else if ('err' in data && data.err.name === "TokenExpiredError") toast.warn('Your session expired.  Please log in again.')
                else toast.error('An error occurred... The server did not respond with any sets. Try logging in again.')

                setUser(false)
                localStorage.setItem('uid', '')

                return props.history.push('/login')
            }

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
            <>
            {
                sets === false ? <LoadingWheel/> :
                (
                    <>
                    <div className="SetCont-grid">
                        <FormSetCreate setCreate={setCreate}/>
                        {sets.length >= 1 && uiSets}
                    </div>
                    </>
                )
            }
            </>
    )
}


export default SetContainer
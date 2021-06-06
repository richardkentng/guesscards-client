import React, {useState, useEffect} from 'react'

import SetModel from '../models/set'
import FormSetCreate from '../components/FormSetCreate'
import SetCard from '../components/SetCard'
import LoadingWheel from '../components/LoadingWheel'
import {userState} from '../recoil/atom'
import {useSetRecoilState} from 'recoil'
import functions from '../partials/functions'
import { toast } from 'react-toastify'

function SetContainer(props) {

    const [sets, setSets] = useState(false)
    const setUser = useSetRecoilState(userState)

    const setCreate = (name) => {
        SetModel.create({name}).then(res => {
            if(!checkKeyInRes('set', res)) return
            props.history.push(`/sets/${res.set._id}`)
        })
    }

    useEffect(() => {
        //update last visited page (for redirection purposes on landing page)
        localStorage.setItem('page', 'SetContainer')

        SetModel.all().then(res => {
            if(!checkKeyInRes('sets', res)) return
            setSets(res.sets)
        })
    }, [])

    const checkKeyInRes = (key, res) => {
        if(!(key in res)) {
            functions.handleAuthErrorsWithToasts(res)
            setUser(false)
            localStorage.setItem('uid', '')
            props.history.push('/login')
            return false
        }
        return true
    }

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
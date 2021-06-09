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

            //if localStorage.sets exists as an array, then push newSet to array and save it
            //else set localStorage.sets to an array of one array
            const newSet = [res.set.name, res.set._id]
            if (localStorage.sets && 
                typeof(JSON.parse(localStorage.sets)) === 'object' &&
                Number.isInteger(JSON.parse(localStorage.sets).length)
            ) {
                const updatedSets = JSON.parse(localStorage.sets)
                updatedSets.push(newSet)
                localStorage.sets = JSON.stringify(updatedSets)

            } else localStorage.sets = JSON.stringify([newSet])

            //show or hide input.set-search based on numberOfSets
            const numSets = JSON.parse(localStorage.sets).length
            const inputSetSearch = document.querySelector('input.set-search')
            if (inputSetSearch) inputSetSearch.style.display = numSets >= 2 ? 'inline' : 'none'

            props.history.push(`/sets/${res.set._id}`)
        })
    }

    useEffect(() => {
        //update last visited page (for redirection purposes on landing page)
        localStorage.setItem('page', 'SetContainer')

        SetModel.all().then(res => {
            if(!checkKeyInRes('sets', res)) return
            setSets(res.sets)

            //show or hide input.set-search
            const inputSetSearch = document.querySelector('input.set-search')
            if (inputSetSearch) inputSetSearch.style.display = res.sets.length >= 2 ? 'inline' : 'none'
            //store sets in localStorage
            const sets = res.sets.map(({name, _id}) => [name, _id])
            localStorage.sets = JSON.stringify(sets)
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

    const updateLocalStorageSets_updateSearchBarVisbility = (res) => {
        // const inputSetSearch = document.querySelector('input.set-search')
        // if (res.sets.length < 2) {
        //     localStorage.sets = ''
        //     if (inputSetSearch) inputSetSearch.style.display = 'none'
        // } else {
        //     const sets = res.sets.map(({name, _id}) => [name, _id])
        //     localStorage.sets = JSON.stringify(sets)
        //     if (inputSetSearch) inputSetSearch.style.display = res.sets.length
        // } 
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
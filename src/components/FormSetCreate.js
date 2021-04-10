import React, {useState} from 'react'
import { toast } from 'react-toastify'

export default function FormSetCreate(props) {

    const [setName, setSetName] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        if (!setName) return toast.warn('Please provide a name for your set!')
        props.setCreate(setName)
        setSetName('')
    }

    return (
        <form onSubmit={onSubmit}>
            <input 
            type="text"
            name="name"
            value={setName}
            placeholder="eg: ENG 101 Vocab"
            autoFocus={true}
            onChange={(e) => setSetName(e.target.value)}
            />
            <button type="submit">Create Set</button>
        </form>
    )
}

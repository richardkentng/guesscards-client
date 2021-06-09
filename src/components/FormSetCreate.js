import React, {useState} from 'react'
import { toast } from 'react-toastify'

export default function FormSetCreate(props) {

    const [setName, setSetName] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        if (setName.trim() === '<') {
            setSetName('')
            return toast.warn('Invalid set name.')
        }
        if (!setName) return toast.warn('Please provide a name for your set!')
        props.setCreate(setName)
        setSetName('')
    }

    return (
        <form onSubmit={onSubmit} className="SetCard" style={{backgroundColor: 'silver'}}>
            <input 
            type="text"
            name="name"
            value={setName}
            placeholder="eg: ENG 101 Vocab"
            autoFocus={true}
            onChange={(e) => setSetName(e.target.value)}
            className="w100p"
            />
            <button type="submit" className="w100p">Create Set</button>
        </form>
    )
}

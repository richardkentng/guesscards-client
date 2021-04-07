import React, {useState} from 'react'
import AuthModel from '../models/auth'

export default function Signup() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        AuthModel.signup({username, password}).then(data => {
            console.log('from client. data retrieved from signup', data);
        })

    }
    return (
        <>
            <h1>SIGN UP!</h1>
            <form onSubmit={onSubmit}>

                <input 
                type="text" 
                placeholder="enter a username" 
                name="username" value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                autoFocus={true}
                />

                <div><input 
                type="text" 
                placeholder="enter a password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                /></div>

                <button type="submit">Sign Me Up Right Now!</button>
            </form>
        </>
    )
}

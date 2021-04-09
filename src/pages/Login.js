import React, {useState} from 'react'
import { toast } from 'react-toastify'

import {useSetRecoilState} from 'recoil'
import {userState} from '../recoil/atom'

import AuthModel from '../models/auth'

export default function Login(props) {

    const setUser = useSetRecoilState(userState)
    const [username, setUsername] = useState('shadow337')
    const [password, setPassword] = useState('ip2pgf')

    const onLogin = (e) => {
        e.preventDefault()
        if (!username || !password) return toast.warn('Please fill out both fields!')
        
        AuthModel.login({username, password}).then(res => {
            console.log('from client. res retrieved from login', res);

            const statusFirstNum = res.status.toString().substring(0,1)
            // if (statusFirstNum === "2") toast.success(res.msg)
            if (statusFirstNum === "4") toast.warn(res.msg)
            else if (statusFirstNum === "5") toast.error(res.msg)

            //if login successful:
            if (res.status === 200) {
                localStorage.setItem('uid', res.token)
                setUser({_id: res._id, username: res.username})
                props.history.push('/sets')
            }
        })
    }

    return (
        <>
            <h1>LOG IN!</h1>
            <form onSubmit={onLogin}>

                <input 
                type="text" 
                placeholder="enter a username" 
                name="username" value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                autoFocus={true}
                />

                <div><input 
                type="password" 
                placeholder="enter a password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                /></div>

                <button type="submit">Log me in baby!</button>
            </form>
        </>
    )
}

import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthModel from '../models/auth'
import {useSetRecoilState} from 'recoil'
import {userState} from '../recoil/atom'
import signup_drawn from '../images/signup_drawn.png'


export default function Signup(props) {

    const setUser = useSetRecoilState(userState)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSignup = (e) => {
        e.preventDefault()
        if (!username || !password) return toast.warn('Please fill out both fields!')
        if (password.length < 8) return toast.warn('Password must be at least 8 characters long.')
        if (password.length > 100) return toast.warn('Password may not exceed 100 characters!')
        if (username.length > 100) return toast.warn('Username may not exceed 100 characters!')
        if (username.split('').includes(' ')) return toast.warn('Username may not contain spaces!')

        AuthModel.signup({username, password}).then(res => {
            console.log('from client. res retrieved from api\'s signup route', res);
            //store token in local storage

            const statusFirstNum = res.status.toString().substring(0,1)
            if (statusFirstNum === "2") toast.success(res.msg)
            else if (statusFirstNum === "4") toast.warn(res.msg)
            else if (statusFirstNum === "5") toast.error(res.msg)

            //if signup successful:
            if (res.status === 201) {
                localStorage.setItem('uid', res.token)
                setUser({_id: res._id, username: res.username})
                props.history.push('/sets')
            }
        })

    }
    return (
        <>
            <form onSubmit={onSignup} className="form-signuplogin">
            <div className="pic-cta">
                <img src={signup_drawn} alt="sign up"/>
                <h1>SIGN UP!</h1>
            </div>

                <div class="inputs">
                    <div>
                        <input 
                        placeholder="enter a username" 
                        id="username-su"
                        type="text" 
                        name="username" value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        autoFocus={true}
                        />
                    </div>
                    <div>
                        <input 
                        placeholder="enter a password" 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <ul className="fs12 mt5 mb10 ml10">
                    <li>at least 8 characters long</li>
                    </ul>
    
                    <button className="btn-signup" type="submit">Sign Me Up Right Now!</button>
                </div>
                    <p className="tac mt10">Already registered? <Link to="/login">Log In!</Link></p>
            </form>
        </>
    )
}

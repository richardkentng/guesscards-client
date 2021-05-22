import React, {useState} from 'react'
import { toast } from 'react-toastify'
import {Link} from 'react-router-dom'
import {useSetRecoilState} from 'recoil'
import {userState} from '../recoil/atom'
import AuthModel from '../models/auth'
import login_drawn from '../images/login_drawn.png'

export default function Login(props) {

    const setUser = useSetRecoilState(userState)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = (e) => {
        e.preventDefault()
        
        AuthModel.login({username, password}).then(res => {
            //display potential errors:
            const statusFirstNum = res.status.toString().substring(0,1)
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
            <form onSubmit={onLogin} className="form-signuplogin">
                <div className="pic-cta">
                    <img src={login_drawn} alt="log in"/>
                    <h1>LOG IN!</h1>
                </div>

                <div className="inputs">
                    <div>
                        <input 
                        placeholder="your username" 
                        type="text" 
                        name="username" value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        autoFocus={true}
                        required={true}
                        />
                    </div>
    
                    <div>
                        <input 
                        placeholder="your password" 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                        />
                    </div>
    
                    <button type="submit" className="btn-login">Log Me In Baby!</button>
                </div>
                    <p className="tac">No account? <Link to="/signup">Sign Up</Link></p>
            </form>
        </>
    )
}

import React, {useEffect} from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthModel from '../models/auth'

import { useRecoilState } from 'recoil'
import {userState} from '../recoil/atom'
import icon from '../images/icon_t.png'
import functions from '../partials/functions'
import { toast } from 'react-toastify'

function Navbar(props) {
    const [user, setUser] = useRecoilState(userState)


    const logout = () => {
        clearStoredTokenAndGlobalUser()
        //record time (for Landing page redirection purposes)
        localStorage.setItem('timeClickedLogOut', Date.now())
        props.history.push('/')
    }

    const clearStoredTokenAndGlobalUser = () => {
        localStorage.setItem('uid','')
        setUser(false)
    }

    useEffect(() => {
        if (!localStorage.uid) logout()

        if (localStorage.getItem("uid")) {
            AuthModel.verify().then((res) => {

                //handle errors like expired token:
                if (!('userData' in res)) {
                    functions.handleAuthErrorsWithToasts(res)
                    clearStoredTokenAndGlobalUser()
                    return props.history.push('/login')
                }

                setUser(res.userData)

            });
        }
    }, [])

    const onClickIcon = () => {
        props.history.push('/')
        localStorage.setItem('timeClickedGuesscardsIcon', Date.now())
    }

    return (
        <nav className={user ? 'nav-bb-in' : 'nav-bb-out'} id="navbar">
            <ul>
                    <li className="icon">
                        <img src={icon} alt="guesscards" onClick={onClickIcon}/>
                    </li>
                {user ? (
                    <>
                    <li className="logout"><button onClick={logout} className="link-button"> Log Out</button></li>
                    {!window.location.href.includes('/sets') && <li className="sets"><Link to="/sets">SETS</Link></li>}
                    <li className="gray username">{user.username}</li>
                    </>
                ) : (
                    <>
                    <li className="about"><Link to="/about">About Me</Link></li>
                    <li className="login"><Link to="/login">Log In</Link></li>
                    <li className="signup"><Link to="/signup">Sign Up</Link></li>
                    <li></li>
                    </>
                )}
            </ul>
        </nav>
    )
}


export default withRouter(Navbar)

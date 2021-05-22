import React, {useEffect} from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthModel from '../models/auth'

import { useRecoilState } from 'recoil'
import {userState} from '../recoil/atom'
import icon from '../images/icon_t.png'
import { toast } from 'react-toastify'

function Navbar(props) {
    const [user, setUser] = useRecoilState(userState)


    const logout = () => {
        clearStoredTokenAndGlobalUser()
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
                    if ('err' in res && res.err.name === "TokenExpiredError") toast.warn('Your session expired.  Please log in again. (Navbar)')
                    else { toast.error('An error occured... Try logging in again. (Navbar)') }

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
        <nav className={user ? 'nav-bb-in' : 'nav-bb-out'}>
            <ul>
                    <li className="icon">
                        <img src={icon} alt="guesscards" onClick={onClickIcon}/>
                    </li>
                {user ? (
                    <>
                    <li className="logout"><button onClick={logout} className="link-button"> Log Out</button></li>
                    {window.location.href.slice(-5) !== '/sets' && <li className="sets"><Link to="/sets">SETS</Link></li>}
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

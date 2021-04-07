import React, {useState} from 'react'
import { Link, withRouter } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import {userState} from '../recoil/atom'

function Navbar(props) {
    const [user, setUser] = useRecoilState(userState)

    const logout = () => {
        localStorage.clear()
        setUser(false)
        props.history.push('/')
    }

    return (
        <nav style={{backgroundColor: user ? 'rgb(163, 203, 117)' : '#ffa4a4'}}>
            <ul>
                {user ? (
                    <>
                    <li><Link to="/sets">STUDYSETS</Link></li>
                    <li onClick={logout}><a href="#">({user.username}) Log Out</a></li>
                    </>
                ) : (
                    <>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Log In</Link></li>
                    </>
                )}
            </ul>
        </nav>
    )
}


export default withRouter(Navbar)

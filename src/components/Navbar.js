import React, {useEffect} from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthModel from '../models/auth'

import { useRecoilState } from 'recoil'
import {userState} from '../recoil/atom'
import icon from '../images/icon_t.png'

function Navbar(props) {
    const [user, setUser] = useRecoilState(userState)


    const logout = () => {
        localStorage.clear()
        setUser(false)
        props.history.push('/')
    }

    useEffect(() => {
        if (!localStorage.uid) logout()
        if (localStorage.getItem("uid")) {
            AuthModel.verify().then((res) => {
                setUser(res.userData);
            });
        }
    }, [])


    return (
        <nav className={user ? 'nav-bb-in' : 'nav-bb-out'}>
            <ul>
                    <li className="icon">
                        <Link to="/"><img src={icon} alt="guesscards"/></Link>
                    </li>
                {user ? (
                    <>
                    <li className="logout"><button onClick={logout} className="link-button"> Log Out</button></li>
                    <li className="sets"><Link to="/sets">SETS</Link></li>
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

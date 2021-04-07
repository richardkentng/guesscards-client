import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/sets">Studysets</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Log In</Link></li>
            </ul>
        </nav>
    )
}

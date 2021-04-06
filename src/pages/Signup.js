import React from 'react'

export default function signup() {

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('you pressed submit!');
    }
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="enter a username" name="username"/>
            <input type="text" placeholder="enter a password" name="password"/>
            <button type="submit">Sign Me Up Right Now!</button>
        </form>
    )
}

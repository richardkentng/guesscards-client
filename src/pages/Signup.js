import React from 'react'

export default function signup() {

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('you pressed submit!');
    }
    return (
        <>
            <h1>SIGN UP!</h1>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="enter a username" name="username" autoFocus={true}/>
                <div><input type="text" placeholder="enter a password" name="password"/></div>
                <button type="submit">Sign Me Up Right Now!</button>
            </form>
        </>
    )
}

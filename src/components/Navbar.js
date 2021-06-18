import React, {useEffect} from 'react'
import { Link, withRouter, useLocation } from 'react-router-dom'
import AuthModel from '../models/auth'

import { useRecoilState } from 'recoil'
import {userState} from '../recoil/atom'
import SetModel from '../models/set'
import icon from '../images/icon_t.png'
import functions from '../partials/functions'
import { toast } from 'react-toastify'

function Navbar(props) {
    const [user, setUser] = useRecoilState(userState)
    const location = useLocation()

    const logout = () => {
        localStorage.setItem('uid','')
        setUser(false)
        //record time (for Landing page redirection purposes)
        localStorage.setItem('timeClickedLogOut', Date.now())
        props.history.push('/')
    }


    useEffect(() => {
        const checkKeyInRes = (key, res) => {
            if(!(key in res)) {
                functions.handleAuthErrorsWithToasts(res)
                setUser(false)
                localStorage.setItem('uid', '')
                props.history.push('/login')
                return false
            }
            return true
        }

        if (!localStorage.uid) logout()

        if (localStorage.getItem("uid")) {
            AuthModel.verify().then((res) => {
                //if not logged in, return
                if (!checkKeyInRes('userData', res)) return

                setUser(res.userData)

                //if page refreshes, sets will be fetched for search bar
                SetModel.all().then(res => {
                    if (!checkKeyInRes('sets', res)) return
                    //show or hide input.set-search
                    const inputSetSearch = document.querySelector('input.set-search')
                    if (inputSetSearch) inputSetSearch.style.display = res.sets.length >= 2 ? 'inline' : 'none'
                    //store sets in localStorage
                    const sets = res.sets.map(({name, _id}) => [name, _id])
                    localStorage.sets = JSON.stringify(sets)
                })
            });
        }

        //add event listener for arrow up/down - computes which div.set-suggestion to select and selects it
        document.addEventListener('keyup', (e) => {
            //arrowUp/Down must be pressed, input.set-search must be focused
            const arrowUp = e.key === 'ArrowUp'
            const arrowDown = e.key === 'ArrowDown'
            if(!arrowUp && !arrowDown) return
            if (document.activeElement !== document.querySelector('input.set-search')) return
            //contSuggestions must be visible and have at least one suggestion inside
            const contSuggestions = document.querySelector('.set-suggestions')
            if (!contSuggestions) return
            if(contSuggestions.style.display === 'none') return
            const suggestions = [...contSuggestions.querySelectorAll('.set-suggestion')]
            if (!suggestions.length) return

            //visually show selected suggestion, and update dateset.selected value
            const selectSuggestion = (index) => {
                suggestions.forEach(sug => {
                    sug.style.backgroundColor = 'white'
                    sug.dataset.selected = 'false'
                })
                suggestions[index].style.backgroundColor = 'silver'
                suggestions[index].dataset.selected = 'true'
            }

            //calculate which suggestion needs to be selected based on currently-selected suggestion
            const indexOfSelectedSug = suggestions.findIndex(sug => sug.dataset.selected === 'true')
            if (arrowUp) {
                if (indexOfSelectedSug === -1 || indexOfSelectedSug === 0) selectSuggestion(suggestions.length - 1)
                else selectSuggestion(indexOfSelectedSug - 1)
            } else if (arrowDown) {
                if (indexOfSelectedSug === -1 || indexOfSelectedSug === suggestions.length - 1) selectSuggestion(0)
                else selectSuggestion(indexOfSelectedSug + 1)
            }
        })

        //add events listeners for alt, /, and Escape (alt + / will focus search bar. escape will escape it)
        document.addEventListener('keydown', (e) => {
            const setSearch = document.querySelector('input.set-search')
            if (!setSearch) return

            if (e.key === 'Alt') {
                setSearch.dataset.altDown = 'true'
            } else if (e.code === 'Slash') {
                if (setSearch.dataset.altDown && document.activeElement !== setSearch) {
                        setSearch.value = ''
                        setSearch.click()
                        setSearch.focus()
                }
            } else if (e.key === 'Escape' && document.activeElement === setSearch) {
                setSearch.blur()
                setSearch.value = ''
                document.body.querySelector('#navbar').click()
            }
        })
        document.addEventListener('keyup', (e) => {
            if (e.key !== 'Alt') return
            const setSearch = document.querySelector('input.set-search')
            if (!setSearch) return
            setSearch.dataset.altDown = ''
            setSearch.value = setSearch.value.replace(/÷+$/, '')
            setSearch.value = setSearch.value.replace(/^÷+/, '')
            if (localStorage.lastSetSearch) setSearch.value = localStorage.lastSetSearch
            setSearch.select()
            onChangeSetSearch()
        })
    }, [])

    const onClickIcon = () => {
        props.history.push('/')
        localStorage.setItem('timeClickedGuesscardsIcon', Date.now())
    }

    const onChangeSetSearch = () => {
        //ensure input.set-search exists
        const setSearch = document.querySelector('input.set-search')
        if (!setSearch) return
        //ensure input.set-search is not empty
        const contSuggestions = document.querySelector('.set-suggestions')

        if (setSearch.value.trim() === '<') return onClickSug(null, contSuggestions, setSearch)

        const querySet = setSearch.value

        const sets = JSON.parse(localStorage.sets)

        const lcAndTrim = (str) => str.trim().toLowerCase()
        const goodSets = sets.filter(([name, id]) => {
            return lcAndTrim(name).includes(lcAndTrim(querySet))
        })

        contSuggestions.innerHTML = ''
        goodSets.forEach(([name, id]) => {
            const sug = document.createElement('div')
            sug.setAttribute('class', 'set-suggestion')
            name = lcAndTrim(name).replaceAll(lcAndTrim(querySet), `<span class="hl-gold">${lcAndTrim(querySet)}</span>`)
            sug.innerHTML = name


            sug.onclick = () => {onClickSug(id, contSuggestions, setSearch)}
            contSuggestions.appendChild(sug)
        })

        function onClickSug(id, contSuggestions, setSearch) {
            const lessThanShortcut = setSearch.value.trim() === '<'
            if (!lessThanShortcut) localStorage.lastSetSearch =  setSearch.value

            contSuggestions.innerHTML = ''
            setSearch.value = ''

            if (lessThanShortcut && window.location.href.match(new RegExp('sets$'))) return

            const http = window.location.host.includes('localhost') ? 'http' : 'https'
            window.location = `${http}://${window.location.host}/sets` + (lessThanShortcut ? '' : `/${id}`)
        }
    }

    const onSubmitSetSearch = (e) => {
        e.preventDefault()
        const contSuggestions = document.querySelector('.set-suggestions')
        if (!contSuggestions) return
        const suggestions = contSuggestions.querySelectorAll('.set-suggestion')
        if (!suggestions.length) return

        const selectedSuggestion = [...suggestions].find(sug => sug.dataset.selected === 'true')

        if (selectedSuggestion) selectedSuggestion.click()
        else suggestions[0].click()
    }

    function onClickInputSetSearch(e) {
        const setSuggestions = document.body.querySelector('.set-suggestions')
        setSuggestions.style.display = 'block'

        document.onclick = (e) => {
            if (!e.target.classList.contains('set-search') && !e.target.classList.contains('set-suggestion')) {
                setSuggestions.style.display = 'none'
            }
        }
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

                    {!location.pathname.startsWith('/sets') && <li className="sets"><Link to="/sets">SETS</Link></li>}

                    <li className="gray username">{user.username}</li>

                    <form 
                    className="form-set-search" 
                    onSubmit={onSubmitSetSearch}
                    style={{ display: location.pathname.startsWith('/sets') ? 'inline-block' : 'none' }}
                    >
                        <input 
                            type="text" 
                            className="set-search" 
                            placeholder="set 🔍 [alt + /]"
                            onChange={onChangeSetSearch}
                            onClick={onClickInputSetSearch}
                            required={true}
                            style={{ display: 'none' }}
                        />
                        <div className="set-suggestions"></div>
                    </form>
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

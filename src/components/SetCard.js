import React from 'react'
import {withRouter} from 'react-router-dom'

function SetCard(props) {

    const onClickSetCard = () => {
        props.history.push(`/sets/${props._id}`)
    }

    const styleSetCard = {}
    const lightBlue = '#d1fdfd'
    if (props._id === localStorage.setId) styleSetCard.backgroundColor = lightBlue

    return (
        <div className="SetCard" onClick={onClickSetCard} style={styleSetCard}>
            <p>
                <span className="title">{props.name}</span>
                <span className={"num " + (props.numCards ? "gray-a" : "red")}> ({props.numCards})</span>
            </p>
        </div>
    )
}

export default withRouter(SetCard)
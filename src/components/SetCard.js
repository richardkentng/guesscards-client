import React from 'react'
import {withRouter} from 'react-router-dom'

function SetCard(props) {

    const onClickSetCard = () => {
        props.history.push(`/sets/${props._id}`)
    }

    return (
        <div className="SetCard" onClick={onClickSetCard}>
            <p>
                <span className="title">{props.name}</span>
                <span className={"num " + (props.numCards ? "gray-a" : "red")}> ({props.numCards})</span>
            </p>
        </div>
    )
}

export default withRouter(SetCard)
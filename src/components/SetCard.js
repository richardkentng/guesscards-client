import React from 'react'
import {withRouter} from 'react-router-dom'

function SetCard(props) {

    const onClickSetCard = () => {
        props.history.push(`/sets/${props._id}`)
    }

    return (
        <div className="SetCard" onClick={onClickSetCard}>
            <p>
                {props.name}
                <span className={props.numCards ? "gray-a" : "red"}> ({props.numCards})</span>
            </p>
        </div>
    )
}

export default withRouter(SetCard)
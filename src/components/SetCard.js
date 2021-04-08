import React from 'react'

export default function SetCard(props) {


    return (
        <div className="SetCard">

            <p>
                {props.name}
                
                <span className={props.numCards ? "gray-a" : "red"}>
                    <span> ({props.numCards})</span>
                </span>
            </p>

        </div>
    )
}
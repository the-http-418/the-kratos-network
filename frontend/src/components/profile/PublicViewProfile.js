import React from 'react'
import Profile from './Profile'
export default function PublicViewProfile(props) {
    return (
        <div>
            <Profile id = {props.match.params.id}/>
        </div>
    )
}

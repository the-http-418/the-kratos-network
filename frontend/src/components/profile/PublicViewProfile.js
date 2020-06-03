import React from 'react'
import Profile from './Profile'
export default function PublicViewProfile(props) {
    return (
        <div>
            public link: <Profile id = {props.match.params.id}/>
        </div>
    )
}

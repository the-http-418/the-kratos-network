import React from 'react';
import {NavLink} from 'react-router-dom';
import Fireapp from '../../config/firebaseConfig'

const handleLogout = async () =>{
    await Fireapp.auth().signOut()
    console.log("user signed out",Fireapp.auth().currentUser)
}
const SignedInLinks = () => {
    return(
        <ul className="right hide-on-med-and-down">
            <li><NavLink to='/createprofile'>Create Profile</NavLink></li>
            <li><NavLink to='/profiles'>Profiles</NavLink></li>
            <li><NavLink to='/content'>Content</NavLink></li>
            <li><NavLink to='/' onClick = {handleLogout} className="btn">Logout</NavLink></li>
        </ul>
    )
}


export default SignedInLinks;

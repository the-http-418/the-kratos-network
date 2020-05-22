import React from 'react';
import {NavLink} from 'react-router-dom';
import Fireapp from '../../config/firebaseConfig'

const handleLogout = async () =>{
    await Fireapp.auth().signOut()
    console.log("user signed out",Fireapp.auth().currentUser)
}
const SignedInLinks = () => {
    return(
        <ul className="right">
            <li><NavLink to='/createprofile'>New Profile</NavLink></li>
            <li><NavLink to='/' onClick = {handleLogout}>Logout</NavLink></li>
            <li><NavLink to='/profiles'>Profiles</NavLink></li>
        </ul>
    )
}


export default SignedInLinks;
import React from 'react'
import ProfileList from '../profile/ProfileList'
import Fireapp from '../../config/firebaseConfig'

class Dashboard extends React.Component
{

    render(){
        return (
            <div>
                <ProfileList/>
            </div>
        )
    }
}
export default Dashboard

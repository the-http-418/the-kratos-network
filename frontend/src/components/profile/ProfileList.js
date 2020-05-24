import React,{Component} from 'react'

class ProfileList extends Component {
    state = {
        profiles : [],
    }
    componentDidMount(){
        //firebase call
        this.setState({
            profiles : [
                {'firstName':'Patrick','lastName':'Rashidi','heading':'zaio developer','id':'DSDJNDO3904','profilePicture':'/img/default_dp.jpg'},
            ]
        })
    }

    render(){
    return (
        <div>
            <h5>Your Profiles</h5>
            <hr/>
            <ul class="collection">
                {
                    this.state.profiles.map((profile) => {return(
                        <li class="collection-item avatar">
                        <img src={profile['profilePicture']} alt="" class="circle"/>
                        <span class="title">{profile['firstName']} {profile['lastName']}</span>
                        <p> {profile['heading']}
                        </p>
                        
                        <a href={`/editprofile/${profile['firstName']}/${profile['id']}`} className="secondary-content material-icons">edit</a>
                        <a href={`/profile/${profile['firstName']}/${profile['id']}`} className="content material-icons">dvr</a>
                        
                    </li>
                    )})
                    
                }
            </ul>
    </div>
    )
    }
}


export default ProfileList

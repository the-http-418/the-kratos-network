import React,{Component} from 'react'
import Fireapp from '../../config/firebaseConfig'

class ProfileList extends Component {
    state = {
        profiles : [],

    }
    componentDidMount(){

        const db = Fireapp.firestore()
        const profiles = []
        const col = db.collection("profiles")
        const tmp = []
        db.collection("profiles").get().then(
            (document) => {
                document.forEach((doc)=>{
                var x = doc.data()['bio']
                x['id'] = doc.id
                tmp.push(x)
                this.setState({
                    profiles:tmp,
                })
            })
        }
        )

        /*const bio = []
        for(var i=0;i<tmp.length;i++){
            const x = tmp[i]['data']['bio']
            x['id'] = tmp[i]['id']
            bio.push(x)
        }*/


    }

    render(){
    console.log("profile",this.state.profiles)
    console.log("tmp",this.state.tmp)
    return (
        <div class='profile-list'>
            <h5>Your Profiles</h5>
            <hr/>
            <ul className="collection">
                {
                    this.state.profiles.map((profile) => {

                        return(

                        <li className="collection-item avatar">
                        <a href={`/profile/${profile['firstName']}/${profile['id']}`}>
                        <img src={profile['profilePicture']} alt={profile['firstName']} className="circle"/>
                        <span className="title">{profile['firstName']} {profile['lastName']}</span>
                        <p> {profile['heading']}
                        </p>
                        </a>
                        <a href={`/editprofile/${profile['firstName']}/${profile['id']}`} className="secondary-content material-icons">edit</a>
                    </li>
                    )})

                }
            </ul>
    </div>
    )
    }
}


export default ProfileList

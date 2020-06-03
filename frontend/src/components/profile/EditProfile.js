import React from 'react'
import CreateProfile from './CreateProfile'
import Fireapp from '../../config/firebaseConfig'

class EditProfile extends React.Component{
    state = {
        id:this.props.match.params.id,
        profile:{
            'bio':{
                'profilePicture' : null,
                'firstName' : '',
                'lastName' : '',
                'header' : '',
                'designation' : '',
                'links' : [],
            },
            'education':[],
            'workExperience':[]
        },
        ready:false
    }
    componentWillMount(){
        //firebase auth to get profile
        const db = Fireapp.firestore()
        const x =  db.collection('profiles').doc(this.state.id)
        x.get().then((profile)=>{
        this.setState({
            profile : profile.data(),
            ready:true
        })
    })
    }

    render(){

        console.log("in edit profile ..",this.state)
        if(this.state.ready){
        return(
        <div>
            <CreateProfile id = {this.state.id} edit = {true} profile={this.state.profile} />
        </div>)
        }
        else{
            return(
                <h5>Loading...</h5>
            )
        }
    
    }
}
export default EditProfile
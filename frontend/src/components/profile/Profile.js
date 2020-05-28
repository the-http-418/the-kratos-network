import React from 'react'
import {EducationList} from '../elements/Education'
import {ExperienceList} from '../elements/Experience'
import {Bio} from '../elements/BasicInfo'
import Fireapp from '../../config/firebaseConfig'

class Profile extends React.Component {
    state = {
        bio:{},
        education : [],
        workExperience : [],
        id:this.props.id,
        ready:false
    }
    componentWillMount(){
        const db = Fireapp.firestore()
        const col = db.collection("profiles")
        const id = this.state.id
        db.collection("profiles").doc(id).get().then(
            (doc) => {
                
                    this.setState( {
                        bio : doc.data()['bio'],
                        education:doc.data()['education'],
                        workExperience:doc.data()['workExperience'],
                        ready:true
                    })
                    console.log(this.state)
                })
        
        
        /*const bio = []
        for(var i=0;i<tmp.length;i++){
            const x = tmp[i]['data']['bio']
            x['id'] = tmp[i]['id']
            bio.push(x)
        }*/
        
        
    }
    render(){
    if(this.state.ready){
    return (
        <div>
            this is profile
            <div class="col s12 m5">
            <div class="card-panel white">
                <Bio bio = {this.state.bio} />
            </div>
            </div>
            <div class="col s12 m5">
            <div class="card-panel white">
                <EducationList education = {this.state.education}/>
            </div>
            </div>
            <div class="col s12 m5">
            <div class="card-panel white">
                <ExperienceList workExperience = {this.state.workExperience}/>
            </div>
            </div>
                
        </div>
    )
    }
    else{
        return(
            <div>
                <h5>Loading...</h5>
            </div>
        )
    }
}
}
export default Profile
import React from 'react'
import {HardSkillsList} from '../elements/HardSkills'
import {SoftSkillsList} from '../elements/SoftSkills'
import {EducationList} from '../elements/Education'
import {ExperienceList} from '../elements/Experience'
import {Bio} from '../elements/BasicInfo'
import Fireapp from '../../config/firebaseConfig'

class Profile extends React.Component {
    state = {
        bio:{},
        education : [],
        workExperience : [],
        hardSkills : [],
        softSkills : [],
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
                        hardSkills:doc.data()['hardSkills'],
                        softSkills:doc.data()['softSkills'],
                        ready:true
                    })
                    console.log(this.state)
                })
    }
    render(){
    if(this.state.ready){
    return (
        <div className = "profile-wrapper">
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
            <div class="col s12 m5">
            <div class="card-panel white">
                <HardSkillsList hardSkills = {this.state.hardSkills}/>
            </div>
            </div>
            <div class="col s12 m5">
            <div class="card-panel white">
                <SoftSkillsList softSkills = {this.state.softSkills}/>
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

import React, { Component } from 'react'
import Fireapp from '../../config/firebaseConfig'

const email = Fireapp.auth().currentUser
class SoftSkillsForm extends Component {
    state = {
        softSkills : [],
    }

    handleChange = (idx,e) => {
        console.log("change..",e.target.id,e.target.value)
        const softskills = [...this.state.softSkills]
        const curr = softskills[idx]
        curr[e.target.id] = e.target.value;
        softskills[idx] = curr;
        this.setState({
            softSkills:softskills
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
        //firebase save
        const db = Fireapp.firestore()
        const ref = db.collection('profiles');
        const softSkills = this.state.softSkills

        if(this.props.id === ''){
        ref.add({
            email:email,
            softSkills:softSkills
        })
        .then(
            (docRef) => {
                this.props.next(docRef.id)
            }
        )
        .catch((error)=>{
            console.log("Some error occured")
        })
        }
        else{
            ref.doc(this.props.id).update({
                softSkills:softSkills
            })
            .then(
                this.props.next(this.props.id)
            )
            .catch((error)=>{
                console.log(
                    'Some error occured'
                )
            })
        }
    }

    handleRemove =(idx,e) =>{
        const softskills = [...this.state.softSkills];
        softskills.splice(idx,1)
        this.setState({
            softSkills:softskills
        })
    }
    addSkill = (e) => {
        const softskills = this.state.softSkills
        console.log("LINKS:",softskills)
        this.setState({
            softSkills:[...softskills,{"softSkillName":"","proficiency":""}]
        })

    }
    componentDidMount(){
        if (this.props.edit){
            const softskills = this.props.profile['softSkills']
            this.setState({
                softSkills:softskills
            })
        }
    }
    render() {
        return (
            <div className="container">
                <form onSubmit ={this.handleSubmit} className = "white">
                    <h5 className="grey-text text-darken-3">
                        Soft Skills
                    </h5>
                    <hr/>
                    {

                        this.state.softSkills.map((softskills,idx)=>{
                            return(
                            <div className="container workexp">
                            <div className = 'input-field'>
                                <datalist id="company-list">
                                    <option key='1' value="GOOGLE"/>
                                    <option key='2' value="MICROSOFT"/>
                                    <option key='3' value="AMAZON"/>
                                </datalist>
                                <input
                                    type="text"
                                    id = 'softSkillName'
                                    value={softskills['softSkillName']}
                                    placeholder="Enter Skill"
                                    list = "company-list"
                                    onChange={(e) => this.handleChange(idx,e)}
                                />
                                </div>
                                <div className='input-field'>
                                <input
                                    type="number"
                                    value={softskills['proficiency']}
                                    id = 'proficiency'
                                    placeholder="Enter Proficiency"
                                    onChange={(e) => this.handleChange(idx,e)}
                                /></div>
                                <button type="button" onClick={() => this.handleRemove(idx)}>
                                Delete Skill
                                </button>
                            </div>
                        )
                        })
                    }

                    <button type = "button" className="btn pink lighten-1 z-depth-0" onClick={this.addSkill}>
                        Add Skill
                    </button>

                    <div type = "button" className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">
                            Save and Next
                        </button>
                    </div>

                </form>
            </div>
        )
    }
}



class SoftSkillsList extends Component {
    //TODO: SORT OUT THE TECH BASED ON FRONTEND BACKEND
    constructor(props){
        super(props);
        this.state = {softSkills:this.props.softSkills}
        console.log("Exsssd ",this.state)
    }

    render() {

        return (
            <div className="softskills profile-view">
                <h5>SOFT SKILLS</h5>
                <hr/>
                <div className="container ouput-softskills">
                    {
                        this.state.softSkills.map((work)=>{
                            return(
                                <HSkills
                                softSkillName={work['softSkillName']}
                                proficiency={work['proficiency']}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )}


}

const HSkills = (props) =>{
    return(
        <div className="container work">
            <div className="heading">
                <img src="/img/default-company.png" className = "company-logo profile-view"/>
                <p>{props.softSkillName}</p>
                <p>{props.proficiency}</p>
            </div>
        </div>
    )
}
export default SoftSkillsForm
export {SoftSkillsList}

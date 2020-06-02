import React, { Component } from 'react'
import Fireapp from '../../config/firebaseConfig'

const email = Fireapp.auth().currentUser

class HardSkillsForm extends Component {
    state = {
        hardSkills : [],
    }

    handleChange = (idx,e) => {
        console.log("change..",e.target.id,e.target.value)
        const hardskills = [...this.state.hardSkills]
        const curr = hardskills[idx]
        curr[e.target.id] = e.target.value;

        this.setState({
            hardSkills:hardskills
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
        //firebase save

        const db = Fireapp.firestore()
        const ref = db.collection('profiles');
        const hardSkills = this.state.hardSkills

        if(this.props.id == ''){
        ref.add({
            email:email,
            hardSkills:hardSkills
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
                hardSkills:hardSkills
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
        const hardskills = [...this.state.hardSkills];
        hardskills.splice(idx,1)
        this.setState({
            hardSkills:hardskills
        })
    }
    addSkill = (e) => {
        const hardskills = this.state.hardSkills
        console.log("LINKS:",hardskills)
        this.setState({
            hardSkills:[...hardskills,{"hardSkillName":"","proficiency":"","startDate":"","endDate":"","description":""}]
        })

    }
    handleSliderChange = (e,idx) =>{
        var x = document.getElementsByClassName(`${idx}-endDate`)[0]
        const hardskills = [...this.state.hardSkills]

        if (e.target.checked){
            x.type = "hidden"

            hardskills[idx]['endDate'] = 'Present';}
        else {
            x.type = "month"

            hardskills[idx]['endDate'] = x.value;
        }

        this.setState({
            hardSkills:hardskills
        })
    }
    componentDidMount(){
        if (this.props.edit){
            const hardskills = this.props.profile['hardSkills']
            this.setState({
                hardSkills:hardskills
            })
        }
    }
    render() {
        return (
            <div className="container">
                <form onSubmit ={this.handleSubmit} className = "white">
                    <h5 className="grey-text text-darken-3">
                        Hard Skills
                    </h5>
                    <hr/>
                    {

                        this.state.hardSkills.map((hardskills,idx)=>{
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
                                    id = 'hardSkillName'
                                    value={hardskills['hardSkillName']}
                                    placeholder="Enter Skill"
                                    list = "company-list"
                                    onChange={(e) => this.handleChange(idx,e)}
                                />
                                </div>
                                <div className='input-field'>
                                <input
                                    type="number"
                                    value={hardskills['proficiency']}
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

                    <button className="btn pink lighten-1 z-depth-0" onClick={this.addSkill}>
                        Add Skill
                    </button>

                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">
                            Save and Next
                        </button>
                    </div>

                </form>
            </div>
        )
    }
}



class HardSkillsList extends Component {
    //TODO: SORT OUT THE TECH BASED ON FRONTEND BACKEND
    constructor(props){
        super(props);
        this.state = {hardSkills:this.props.hardSkills}
        console.log("Exsssd ",this.state)
    }

    render() {
        return (
            <div className="hardskills profile-view">
                <h5>HARD SKILLS</h5>
                <hr/>
                <div className="container ouput-hardskills">
                    {
                        
                        this.state.hardSkills.map((work)=>{
                            return(
                                <HSkills
                                hardSkillName={work['hardSkillName']}
                                proficiency={work['proficiency']}
                                />
                            )
                       })
                    }
                </div>
            </div>
        )
    }
    
}

const HSkills = (props) =>{
    return(
        <div className="container work">
            <div className="heading">
                <img src="/img/default-company.png" className = "company-logo profile-view"/>
                <p>{props.hardSkillName}</p>
                <p>{props.proficiency}</p>
            </div>
        </div>
    )
}
export default HardSkillsForm
export {HardSkillsList}
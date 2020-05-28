import React, { Component } from 'react'
import Fireapp from '../../config/firebaseConfig'

class SoftSkillsForm extends Component {
    state = {
        softSkills : [],
    }

    handleChange = (idx,e) => {
        console.log("change..",e.target.id,e.target.value)
        const softskills = [...this.state.softSkills]
        const curr = softskills[idx]
        curr[e.target.id] = e.target.value;

        this.setState({
            softSkills:softskills
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
        //firebase save
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
            softSkills:[...softskills,{"softSkillName":"","proficiency":"","startDate":"","endDate":"","description":""}]
        })

    }
    handleSliderChange = (e,idx) =>{
        var x = document.getElementsByClassName(`${idx}-endDate`)[0]
        const softskills = [...this.state.softSkills]

        if (e.target.checked){
            x.type = "hidden"

            softskills[idx]['endDate'] = 'Present';}
        else {
            x.type = "month"

            softskills[idx]['endDate'] = x.value;
        }



        this.setState({
            softSkills:softskills
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



class SoftSkillsList extends Component {
    state={
        softSkills : [],
        //{softSkillName","proficiency","startDate","endDate","description"}
    }
    componentDidMount(){
        //firebase call
        this.setState({
            softSkills:[{"softSkillName":"Aerobotics","proficiency":5},]
        })
    }

    render() {
        return (
            <div className="softskills profile-view">
                <h5>HARD SKILLS</h5>
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
        )
    }
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

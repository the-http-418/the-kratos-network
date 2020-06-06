import React, { Component } from 'react'
import Fireapp from '../../config/firebaseConfig'


const email = Fireapp.auth().currentUser
class ExperienceForm extends Component {
    state = {
        workExperience : [],
    }

    handleChange = (idx,e) => {
        console.log("change..",e.target.id,e.target.value)
        const education = [...this.state.workExperience]
        const curr = education[idx]
        curr[e.target.id] = e.target.value;

        this.setState({
            workExperience:education
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
        //firebase save
        const db = Fireapp.firestore()
        const ref = db.collection('profiles');
        const workExperience = this.state.workExperience

        if(this.props.id === ''){
        ref.add({
            email:email,
            workExperience:workExperience
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
                email:email,
                workExperience:workExperience
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
        const education = [...this.state.workExperience];
        education.splice(idx,1)
        this.setState({
            workExperience:education
        })
    }

    addExperience = (e) => {
        const education = this.state.workExperience
        console.log("LINKS:",education)
        this.setState({
            workExperience:[...education,{"companyName":"","role":"","startDate":"","endDate":"","description":""}]
        })

    }

    handleDateChange =(val,date,idx) =>{
        console.log("change.date")
        const education = [...this.state.workExperience]
        const curr = education[idx]
        curr[val] = date;

        this.setState({
            workExperience:education
        })
        console.log("STATE",this.state)
    }

    handleSliderChange = (e,idx) =>{
        var x = document.getElementsByClassName(`${idx}-endDate`)[0]
        const education = [...this.state.workExperience]

        if (e.target.checked){
            x.type = "hidden"

            education[idx]['endDate'] = 'Present';}
        else {
            x.type = "month"

            education[idx]['endDate'] = x.value;
        }



        this.setState({
            workExperience:education
        })
    }

    componentDidMount(){
        if (this.props.edit){
            const education = this.props.profile['workExperience']
            this.setState({
                workExperience:education
            })
        }
    }

    render() {
        return (
            <div className="container">
                <form onSubmit ={this.handleSubmit} className = "white">
                    <h5 className="grey-text  text-darken-3">
                        Work Experience
                    </h5>
                    <hr/>
                    {

                        this.state.workExperience.map((experience,idx)=>{
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
                                    id = 'companyName'
                                    value={experience['companyName']}
                                    placeholder="Enter Company Name"
                                    list = "company-list"
                                    onChange={(e) => this.handleChange(idx,e)}
                                />
                                </div>
                                <div className='input-field'>
                                <input
                                    type="text"
                                    value={experience['role']}
                                    id = 'role'
                                    placeholder="Enter your role"
                                    onChange={(e) => this.handleChange(idx,e)}
                                /></div>

                                <div className="input-field">
                                    Start date:
                                    <input type="month" value={experience['startDate']} id="startDate" onChange={(e) => this.handleChange(idx,e)}/>
                                </div>
                                <div className="input-field">
                                    End date:
                                    <input type="month" value={experience['endDate']} id="endDate" className = {`${idx}-endDate`}  onChange={(e) => this.handleChange(idx,e)}/>

                                </div>
                                <div className='input-field'>
                                <div class="switch">
                                    <label>
                                    <input type="checkbox" onChange ={(e) => this.handleSliderChange(e,idx)}/>
                                    <span className="lever"></span>
                                    I am still working here
                                    </label>
                                </div>
                                </div>
                                <div className='input-field'>
                                <input
                                    type="text"
                                    id = 'description'
                                    placeholder="Enter description"
                                    value={experience['description']}
                                    onChange={(e) => this.handleChange(idx,e)}
                                /></div>
                                <button type="button" onClick={() => this.handleRemove(idx)}>
                                X
                                </button>

                            </div>

                        )
                        })
                    }

                    <button type="button" className="btn pink lighten-1 z-depth-0" onClick={this.addExperience}>
                        Add Education
                    </button>

                    <div className="input-field">
                        <button type="button" onClick= {this.handleSubmit} className="btn pink lighten-1 z-depth-0">
                            Save and Next
                        </button>
                    </div>

                </form>
            </div>
        )
    }
}



class ExperienceList extends Component {
    constructor(props){
        super(props);
        this.state = {workExperience:this.props.workExperience}
        console.log("Exsssd ",this.state)
    }

    render() {
        return (
            <div className="experience profile-view">
                <h5 className="purple-text">EXPERIENCE</h5>
                <hr/>
                <div className="container ouput-experience">
                    {
                        this.state.workExperience.map((work)=>{
                            return(
                                <Work
                                companyName={work['companyName']}
                                role={work['role']}
                                startDate={work['startDate']}
                                endDate={work['endDate']}
                                description={work['description']}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const Work = (props) =>{
  const devIconStyle = {
    width: "200px",
};
    return(
        <div className="container work">
            <div className="heading">
                
                <img src="/img/workicon.jpg" className = "company-logo profile-view" style={devIconStyle}/>
                <p className="flow-text">{props.companyName}</p>
                <p>{props.role}</p>
                <p>{props.startDate} - {props.endDate}</p>
            </div>
            <div className="description">
                {props.description}
            </div>
        </div>
    )
}
export default ExperienceForm
export {ExperienceList}

import React, { Component } from 'react'
import Fireapp from '../../config/firebaseConfig'


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
    render() {
        return (
            <div className="container">
                <form onSubmit ={this.handleSubmit} className = "white">
                    <h5 className="grey-text text-darken-3">
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
                                    placeholder="Enter Company Name"
                                    list = "company-list"
                                    onChange={(e) => this.handleChange(idx,e)}
                                />
                                </div>
                                <div className='input-field'>
                                <input
                                    type="text"
                                    id = 'role'
                                    placeholder="Enter your role"
                                    onChange={(e) => this.handleChange(idx,e)}
                                /></div>
                                
                                <div className="input-field">
                                    Start date:
                                    <input type="month" id="startDate" onChange={(e) => this.handleChange(idx,e)}/>
                                </div>
                                <div className="input-field">
                                    End date:
                                    <input type="month" id="endDate" className = {`${idx}-endDate`}  onChange={(e) => this.handleChange(idx,e)}/>
                            
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
                                    onChange={(e) => this.handleChange(idx,e)}
                                /></div>
                                <button type="button" onClick={() => this.handleRemove(idx)}>
                                X
                                </button>
                                
                            </div>
                        
                        )
                        }) 
                    }
                    
                    <button className="btn pink lighten-1 z-depth-0" onClick={this.addExperience}>
                        Add Education
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



class Experience extends Component {
    state={
        workExperience : [],
        //{companyName","role","startDate","endDate","description"}
    }
    componentDidMount(){
        //firebase call
    }
    render() {
        return (
            <div className="experience profile-view">
                <h5>EXPERIENCE</h5>
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
    return(
        <div className="container work">
            <div className="heading">
                <img src="/img/default-company.png" className = "company-logo profile-view"/>
                <p>{this.props.companyName}</p>
                <p>{this.props.role}</p>
                <p>{this.props.startDate} - {this.props.endDate}</p>
            </div>
            <div className="description">
                {this.props.description}
            </div>
        </div>
    )
}
export default ExperienceForm

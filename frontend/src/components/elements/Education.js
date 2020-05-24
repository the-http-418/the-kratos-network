import React, { Component } from 'react'
import Fireapp from '../../config/firebaseConfig'


class EducationForm extends Component {
    state = {
        education : [],
    }
    
    handleChange = (idx,e) => {
        const education = [...this.state.education]
        const curr = education[idx]
        curr[e.target.id] = e.target.value;
        this.setState({
            education:education
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
        //firebase save
    }

    handleRemove =(idx,e) =>{
        const education = [...this.state.education];
        education.splice(idx,1)   
        this.setState({
            education:education
        })     
    }

    addEducation = (e) => {
        const education = this.state.education
        console.log("LINKS:",education)
        this.setState({
            education:[...education,{"collegeName":"","stream":"","accolade":""}]
        })
    }
    componentDidMount(){
        if (this.props.edit){
            const education = this.props.profile['education']
            this.setState({
                education:education
            })
        }
    }
    render() {
        
        return (
            <div className="container">
                <form onSubmit ={this.handleSubmit} className = "white">
                    <h5 className="grey-text text-darken-3">
                        Educational history
                    </h5>
                    
                   <hr/>
                    {
                        this.state.education.map((school,idx)=>{return(
                            <div className = 'input-field'>
                                <datalist id="college-list">
                                    <option value="HARVARD"/>
                                    <option value="UCLA"/>
                                    <option value="MIT"/>
                                </datalist>
                                
                        
        
                                <input
                                    type="text"
                                    id = 'collegeName'
                                    placeholder="Enter College Name"
                                    value = {school['collegeName']}
                                    list = "college-list"
                                    onChange={(e) => this.handleChange(idx,e)}
                                />
                                <input
                                    type="text"
                                    id = 'stream'
                                    value = {school['stream']}
                                    placeholder="Enter Stream Name"
                                    onChange={(e) => this.handleChange(idx,e)}
                                />
                                <input
                                    type="text"
                                    id = 'accolade'
                                    value = {school['accolade']}
                                    placeholder="Enter accolade"
                                    onChange={(e) => this.handleChange(idx,e)}
                                />
                                <button type="button" onClick={() => this.handleRemove(idx)}>
                                X
                                </button>
                                
                            </div>
                            
                        )
                        }) 
                    }
                    
                    <button className="btn pink lighten-1 z-depth-0" onClick={this.addEducation}>
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



class EducationList extends Component {
    state={
        education : [],
        //{collegeName,stream,accolade}
    }
    componentDidMount(){
        //firebase call
        this.setState({
            education:[{"collegeName":"Harvard","stream":"Computer science and engineering","accolade":"Graduated with diploma"}]
        })
    }
    render() {
        return (
            <div className="education profile-view">
                <h5>EDUCATION</h5>
                <hr/>
                <div className="container ouput-education">
                    {
                        this.state.education.map((school,idx)=>{
                            return(
                                <School 
                                    collegeName = {this.state.education[idx]['collegeName']}
                                    stream = {this.state.education[idx]['stream']}
                                    accolade = {this.state.education[idx]['accolade']}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const School = (props) =>{
    return(
        <div className="container work">
            <div className="heading">
                <img src="/img/default_college.jpg" className = "company-logo profile-view"/>
                <p>{props.collegeName}</p>
            <p>{props.stream}</p>
                <p>{props.accolade}</p>
            </div>
        </div>
    )
}


export default EducationForm
export {EducationList}
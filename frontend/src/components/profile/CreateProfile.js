import React from 'react'
import BasicInfoForm from '../elements/BasicInfo'
import EducationForm from '../elements/Education'
import ExperienceForm from '../elements/Experience'
import HardSkillsForm from '../elements/HardSkills'
import SoftSkillsForm from '../elements/SoftSkills'
import M from 'materialize-css'

export default class CreateProfile extends React.Component {
    state = {
      id : this.props.id ? this.props.id : '' 
    }
    componentDidMount() {
        M.Tabs.init(this.Tabs);
        this.instance = M.Tabs.getInstance(this.Tabs)
      }
      
      render() {
        console.log("in create profile ..",this.props.profile)
        return (
          <>
            <ul
              ref={Tabs => {
                this.Tabs = Tabs;
              }}
              id="tabs-swipe-demo"
              className="tabs"
            >
              <li className="tab col s3">
                <a href="#test-swipe-1">Basic Details</a>
              </li>
              <li className="tab col s3">
                <a href="#test-swipe-2">Education</a>
              </li>
              <li className="tab col s3">
                <a href="#test-swipe-3">Work Experience</a>
              </li>
              <li className="tab col s3">
                <a href="#test-swipe-4">Hard skills</a>
              </li>
              <li className="tab col s3">
                <a href="#test-swipe-5">Soft skills</a>
              </li>
            </ul>
    
            <div id="test-swipe-1">
              <BasicInfoForm id = {this.state.id} next={(id)=>{this.setState({id:id});this.instance.select('test-swipe-2')}} edit={this.props.edit} profile={this.props.profile}/>
            </div>
            <div id="test-swipe-2" >
              <EducationForm id = {this.state.id} edit={this.props.edit} next={(id)=>{this.setState({id:id});this.instance.select('test-swipe-3')}} profile={this.props.profile}/>
            </div>
            <div id="test-swipe-3" >
              <ExperienceForm id = {this.state.id} edit={this.props.edit} next={(id)=>{this.setState({id:id});this.instance.select('test-swipe-4')}} profile={this.props.profile}/>
            </div>
            <div id="test-swipe-4" >
              <HardSkillsForm id = {this.state.id} edit={this.props.edit} next={(id)=>{this.setState({id:id});this.instance.select('test-swipe-5')}} profile={this.props.profile}/>
            </div>
            <div id="test-swipe-5" >
              <SoftSkillsForm  id = {this.state.id} edit={this.props.edit} profile={this.props.profile}/>
            </div>
          </>
        );
      }
    
}

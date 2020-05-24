import React, { Component } from 'react'
import Fireapp from '../../config/firebaseConfig'

class BasicInfoForm extends Component {
    state = {
        profilePicture : null,
        firstName : '',
        lastName : '',
        header : '',
        designation : '',
        links : [],
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleImageChange = (e) =>{
        if(e.target.files[0]){
            const image = e.target.files[0]
            this.setState({
                profilePicture:image,
            })
        }
    }

    handleLinkChange = (idx,e) => {
        const links = [...this.state.links]
        links[idx] = e.target.value;

        this.setState({
            links:links
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
        //firebase save
    }

    handleLinkRemove =(idx,e) =>{
        const links = [...this.state.links];
        links.splice(idx,1)   
        this.setState({
            links:links
        })     
    }

    addLink = (e) => {
        const links = this.state.links
        console.log("LINKS:",links)
        this.setState({
            links:[...links,""]
        })
    }
    componentDidMount(){
        console.log("in basicinfo profile ..",this.props.profile)
        if (this.props.edit){
            const bio = this.props.profile['bio']
            this.setState({
                profilePicture :bio['profilePicture'],
                firstName : bio['firstName'],
                lastName : bio['lastName'],
                header : bio['header'],
                designation : bio['designation'],
                links : bio['links'],
            })
        }
    }
    render() {
        
        return (
            <div className="container">
                <form onSubmit ={this.handleSubmit} className = "white">
                    <h5 className="grey-text text-darken-3">
                        Enter your basic info
                    </h5>
                    <hr/>
                    <div className="input-field">
                        Upload your dp:
                        <input type="file" file= {this.state.profilePicture} id = "profilePicture" onChange={this.handleImageChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" value = {this.state.firstName} id = "firstName" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id = "lastName" value = {this.state.lastName} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="header">Give a two word header about you</label>
                        <input type="text" id = "header" value = {this.state.header}  onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="designation">designation</label>
                        <input type="text" id = "designation" value = {this.state.designation} onChange={this.handleChange} />
                    </div>
                    Links:
                    {
                        this.state.links.map((link,idx)=>{return(
                            <div className = 'input-field'>
                                <input
                                    type="text"
                                    id = {idx}
                                    value = {link}
                                    placeholder="Enter your link url"
                                    onChange={(e) => this.handleLinkChange(idx,e)}
  
                                />
                                <button type="button" onClick={() => this.handleLinkRemove(idx)}>
                                X
                                </button>
                            </div>
                       
                        )
                        }) 
                    }
                    
                    <button className="btn pink lighten-1 z-depth-0" onClick={this.addLink}>
                        Add Link
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


class Bio extends Component {
    state={
        profilePicture : null,
        firstName : '',
        lastName : '',
        header : '',
        designation : '',
        links : [],
    }
    componentDidMount(){
        //firebase call
        this.setState({
            profilePicture : null,
            firstName : 'PAtrick',
            lastName : 'Rashidi',
            header : 'Zaio Dev',
            designation : 'Full stack developer and automation',
            links : ['youtube.com','github.com'],
        })
    }
    render() {
        return (
            <div className="education profile-view">
                
                <div className="container ouput-bio">
                    
                
            <div className="content">
                <div className="image-container">
                <img src="/img/default_dp.jpg" className = "profile-logo profile-view"/>
                </div>
                <div className="information">
                <p>{this.state.header}</p>
                <p>{this.state.firstName} {this.state.lastName}</p>
                <p>{this.state.designation}</p>
                <h6><b>Meet me</b></h6>
                {
                    this.state.links.map((link)=>
                    {
                        return(<p>{link}</p>)
                    })
                }
                </div>
            </div>
            
        </div>
                        
                
            </div>
        )
    }
}


export default BasicInfoForm
export {Bio}
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

    render() {
        return (
            <div className="container">
                <form onSubmit ={this.handleSubmit} className = "white">
                    <h5 className="grey-text text-darken-3">
                        Enter your basic info
                    </h5>
                    <hr/>
                    <div className="input-field">
                        <label htmlFor="profilePicture">Upload your dp</label>
                        <input type="file" id = "profilePicture" onChange={this.handleImageChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id = "firstName" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id = "lastName" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="header">Give a two word header about you</label>
                        <input type="text" id = "header" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="designation">designation</label>
                        <input type="text" id = "designation" onChange={this.handleChange} />
                    </div>
                    Links:
                    {
                        this.state.links.map((link,idx)=>{return(
                            <div className = 'input-field'>
                                <input
                                    type="text"
                                    id = {idx}
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

export default BasicInfoForm

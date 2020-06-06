import React, { Component } from 'react'
import Fireapp from '../../config/firebaseConfig'
import M from 'materialize-css'

const storage = Fireapp.storage();
const email = Fireapp.auth().currentUser
class BasicInfoForm extends Component {
    state = {
        progress:0,
        image:null,
        profilePicture : 'img/default_dp.jpg',
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
                image:image,
            })

        }
    }

    handleImageUpload =  () => {
        const { image } = this.state;
        if (image == null ) return;
        console.log("HERE")
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        console.log("HERE")
        uploadTask.on(
          "state_changed",
          snapshot => {
            // progress function ...
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({ progress });
          },
          error => {
            // Error function ...
            console.log(error);

          },
          () => {
            // complete function ...
            console.log("INSIDE STORAGE")
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                console.log("INSIDE STORAGE")
                this.setState({
                    profilePicture:url,
                });
              });
          }
        );
      };

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
        if(this.props.edit == true && this.state.image == null)
        {
            this.setState({
                profilePicture:this.props.profile['bio']['profilePicture']
            })
        }
        console.log("IMAGE UPLOADED!",this.state.profilePicture)
        const db = Fireapp.firestore()
        const ref = db.collection('profiles');
        const bio = {
            'profilePicture' : this.state.profilePicture,
            'firstName' : this.state.firstName,
            'lastName' : this.state.lastName,
            'header' : this.state.header,
            'designation' : this.state.designation,
            'links' : this.state.links,
        }
        if(this.props.id == ''){
        ref.add({
            email:email,
            bio:bio
        }).then(
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
                bio:bio
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
                <form className = "white">
                    <h5 className="grey-text text-darken-3">
                        Enter your basic info
                    </h5>
                    <hr/>
                    <div className="input-field">
                        Upload your dp:
                        <input type="file" file= {this.state.image} id = "image" onChange={this.handleImageChange} />
                        <button type="button" className="btn pink white-text" onClick={this.handleImageUpload}>UPLOAD</button>
                        <div className="progressBar">{this.state.progress}</div>
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
                                <button type="button" onClick={(e) => this.handleLinkRemove(idx)}>
                                X
                                </button>
                            </div>

                        )
                        })
                    }

                    <button type="button" className="btn pink lighten-1 z-depth-0" onClick={this.addLink}>
                        Add Link
                    </button>

                    <div className="input-field">
                        <button type="button" className="btn pink lighten-1 z-depth-0" onClick={this.handleSubmit}>
                            Save and Next
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}


class Bio extends Component {
    constructor(props){
        super(props);
        this.state = this.props.bio
    }
    render() {
        return (
            <div className="education profile-view">
            <h5 className = "purple-text">ABOUT</h5>
            <hr/>
            <br/>
                <div className="container ouput-bio">


            <div className="content row">
                <div className="image-container col s12 m6">
                <img  src={this.state.profile==''?"img/default_dp":this.state.profilePicture} className = "profile-logo profile-view circle"/>
                </div>
                <div className="information-profile col s12 m6">
                <p className="">{this.state.header}</p>
                <p className="flow-text"><b>{this.state.firstName} {this.state.lastName}</b></p>
                
                <p>{this.state.designation}</p>
                <hr/>
                { this.state.links?<p><b>Meet Me</b></p>:<br/> }
                
                {
                    this.state.links.map((link)=>
                    {
                        return(<p><a className="purple-text" href={link}>{link}</a></p>)
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

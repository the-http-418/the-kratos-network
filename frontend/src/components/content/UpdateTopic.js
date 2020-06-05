import React, { Component } from 'react'
import Fireapp from '../../config/firebaseConfig'
import { Preloader } from '../utlis/Preloader'
import M from 'materialize-css'
import { Redirect } from 'react-router-dom'

export default class UpdateTopic extends Component {
    state = {
            loading:true,
            id:null,
            content:null,
            items:null,
            redirect:null
        }
    componentWillMount(){
        const db = Fireapp.firestore()
        const id = this.props.match.params.id
        db.collection("topics").doc(id).get().then(
            (doc)=>{
                this.setState({
                    id:id,
                    content:doc.data(),
                    items: doc.data()['items'] ? doc.data()['items']:[],
                    loading:false
                })
            }
        )
    }
    handleChange = (e) => {
        var x = this.state.content
        x[e.target.id] = e.target.value
        this.setState({
            content:x
        }) 
    }
    handleSubmit = (e,id) => {
        e.preventDefault()
        const db = Fireapp.firestore()
        db.collection("topics").doc(id).update({
            title:this.state.content['title'],
            description:this.state.content['description'],
            items:this.state.items
        }).then(
            this.setState({
                redirect:`/content`
            })
        )
    }
    createVideo  = (e,id) =>{
        const db = Fireapp.firestore()
        db.collection("videos").add({
            'description':'',
            'title':'Untitled video',
            'topic_id':id,
            'type':'video',
            'video_url':null
        }).then((docRef)=>{
            var items = this.state.items;
            items.push({'title':"undefined title",'id':docRef.id, 'type':'video'})
            this.setState({
                items:items
            })
            db.collection("topics").doc(id).update({
                title:this.state.content['title'],
                description:this.state.content['description'],
                items:this.state.items
            }).then(
                this.setState({
                    redirect:`/video/${docRef.id}`
                })
            )
        })
    }
    createDeliverable = (e,id) => {
        const db = Fireapp.firestore()
        db.collection("deliverables").add({
            'description':'',
            'title':'Untitled deliverable',
            'topic_id':id,
            'type':'deliverable',
            'points':'',
            'deadline':'',
        }).then((docRef)=>{
            console.log("KJSHjk",this.state)
            var items = this.state.items;
            items.push({'title':"undefined title",'id':docRef.id, 'type':'deliverable'})
            this.setState({
                items:items
            })
            const db = Fireapp.firestore()
            db.collection("topics").doc(id).update({
                title:this.state.content['title'],
                description:this.state.content['description'],
                items: this.state.items
            }).then(
            this.setState({
                redirect:`/deliverable/${docRef.id}`
            })
            )
            
        })
    }
    deleteItem (id,type){
        const db = Fireapp.firestore()
        var items = this.state.items
        for(var i=0;i<items.length;i++){
            if (items[i]['id'] == id && items[i]['type'] == type){
                break;
            }
            
        }
        items.splice(i,1);
        this.setState({
            items:items
        })
        db.collection("topics").doc(this.state.id).update({
            'items':this.state.items
        })
        if (type == "video"){
            db.collection("videos").doc(id).delete()
        }
        else{
            db.collection("deliverables").doc(id).delete()
        }
    }
    render() {
        if(this.state.redirect){
            return(<Redirect to={this.state.redirect}/>)
        }
        console.log(this.state)
        if(this.state.loading == false){
        return (
            <div className = "update-topic">
                <div className="wrapper-update-topic">
                <form method="POST" className = "update-topic-form">
                    <div className="heading">
                        <h5>Topic
                        <button type="button" className = "btn right purple darken-3" onClick={(e)  => this.handleSubmit(e,this.state.id)}>SAVE</button>
                        </h5><br/><div className="divider purple"></div>
                    </div>
                    <br/>
                    <div class="row">
                        <div class="input-field active col s6">
                            <input id="title" type="text" value = {this.state.content['title']} onChange={this.handleChange}></input>
                            <label className = "active" for="title">Title</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                        <textarea id="description" value = {this.state.content['description']} onChange={this.handleChange} class="materialize-textarea" type='textarea'/>
                        <label className="active" for="description">Description</label>
                        </div>
                    </div>
                </form>
                <div class = "action-buttons">
                    <button onClick = {(e)=>{this.createVideo(e,this.state.id)}} class="waves-effect waves-light btn action-button purple darken-3"><i class="material-icons left">attach_file</i>Video</button>
                    <button onClick = {(e)=>{this.createDeliverable(e,this.state.id)}} class="waves-effect waves-light btn action-button purple darken-3"><i class="material-icons left">add</i>Deliverable</button>
                </div>

               
                <ul class="collection">
                    {
                        this.state.items.map((item)=>{
                            return(
                            <ContentListItem type={item.type} id={item.id} name = {item.title} item = {item} delete={(id,type) => this.deleteItem(id,type)} />
                        )})
                    }   
                </ul>
                </div>
            </div>
        )}
        else{
            return(<Preloader/>)
        }
    }
}
class ContentListItem extends Component{
    componentDidMount(){
    
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems);
        
    }
    render(){
    return (
        
        <li className="collection-item avatar thiscollection">
            
            {
                (this.props.type == "video")?<i className="avatar-item material-icons circle purple">book</i>
                                       :<i className ="avatar-item material-icons circle purple">assignment</i>
            }
            <br/>
        
            <p className="flow-text topic-text"><a className="purple-text" href={`/${this.props.type}/${this.props.id}`}>{this.props.name}</a></p>
            <a href = {`#modal1-${this.props.id}`} className = "modal-trigger"><i class="material-icons purple-text secondary-content">close</i></a>
            <div id={`modal1-${this.props.id}`} className="modal">
                <div class="modal-content">
                <h4>Are you sure to delete {this.props.name}?</h4>
                <p>You will not be able to revert this action</p>
                </div>
                <div class="modal-footer">
                <a href="#" onClick ={() => this.props.delete(this.props.id,this.props.type)} class="modal-close waves-effect waves-green btn-flat">Delete</a>
                </div>
            </div>
        </li>
        
    )}
}
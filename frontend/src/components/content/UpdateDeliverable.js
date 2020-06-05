import React, { Component } from 'react'
import { Preloader } from '../utlis/Preloader'
import Fireapp from '../../config/firebaseConfig'
import {Redirect} from 'react-router-dom'
export default class UpdateTopic extends Component {
    
    state = {
        content : null,
        id : null,
        loading:true
    }

    handleChange = (e) => {
        var x = this.state.content
        x[e.target.id] = e.target.value
        this.setState({
            content:x
        }) 
    }

    handleSubmit = (e) => {
        e.preventDefault()
        var id = this.state.id
        const db = Fireapp.firestore()
        db.collection("deliverables").doc(id).update({
            title:this.state.content['title'],
            description:this.state.content['description'],
            points:this.state.content['points'],
            deadline:this.state.content['deadline']
        }).then((ref)=>{
            var items;
            db.collection("topics").doc(this.state.content['topic_id']).get().then(
                (doc)=>{
                    items = doc.data()['items']
                var i;
                for(i=0;i<items.length;i++) {
                    if(items[i]['id'] == id)
                    {
                        items[i]['title'] = this.state.content['title']
                        break
                    }
                };
                db.collection("topics").doc(this.state.content['topic_id']).update({
                    items:items
                }).then(
            this.setState({
               redirect:`/topic/${this.state.content['topic_id']}`
                    })
                )}
                )
            })
    }

    componentWillMount(){
        const db = Fireapp.firestore()
        const id = this.props.match.params.id
        db.collection("deliverables").doc(id).get().then(
            (doc)=>{
                this.setState({
                    id:id,
                    content:doc.data(),
                    loading:false
                })
            }
        )
    }

    render() {
        if(this.state.redirect){
            return(<Redirect push to={this.state.redirect}/>)
        }
        if(this.state.loading){
            return(<Preloader/>)
        }
        else{
        return (
            <div className = "update-deliverable">
                <div >
                <form method="POST" className = "update-deliverable-form">
                    <div className="heading">
                        <h5>Deliverable
                        <button type="button" className = "btn right purple darken-3" onClick={this.handleSubmit}>SAVE</button>
                        </h5><br/><div className="divider purple"></div>
                    </div>
                    <br/>
                    <div className = "wrapper-update-deliverable-text">
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="title" onChange = {this.handleChange} value ={this.state.content['title']} type="text"/>
                            <label for="title">Title</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <textarea id="description" onChange = {this.handleChange} value = {this.state.content['description']} class="materialize-textarea" type='textarea'/>
                        <label className = "active" for="description">Instructions</label>
                        </div>
                    </div>
                    </div>
                    <div className = "wrapper-update-deliverable-num">
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="points" onChange = {this.handleChange} value = {this.state.content['points']} type="number"/>
                            <label className = "active" for="points">points</label>
                        </div>
                    </div>
                    <div class="row">
                    <label for="due" class="col s2">Due</label>
                        <div class="input-field col s10">
                            <input id="deadline" onChange = {this.handleChange} value = {this.state.content['deadline']} type="datetime-local"/>
                        </div>
                    </div>
                    </div>
                </form>
                </div>
            </div>
        )
    }}
}

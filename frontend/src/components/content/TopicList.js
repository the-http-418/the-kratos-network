import React, { Component } from 'react'
import Topic from './Topic'
import {Redirect} from 'react-router-dom'
import Fireapp from '../../config/firebaseConfig'
import {Preloader} from '../utlis/Preloader'

class TopicList extends Component {
    state = {
        redirect : null,
        loading : false,
        topics : this.props.topics,
    }
    createTopic = () => {
        const db = Fireapp.firestore()
        const email = Fireapp.auth().currentUser.email
        const ref = db.collection('topics');
        const id = ''
        ref.add({
            'email':email,
            'title':"Untitled",
            'items':[],
            'description':''
        })
        .then(
            (docRef) => {
                this.setState({
                    redirect : `topic/${docRef.id}`
                })
            }
        )
        .catch((error)=>{
            console.log("Some error occured")
        })
        
    }
    
    deleteTopic = (id) => {
        const db = Fireapp.firestore()
        var topics = this.state.topics
        for(var i=0;i<topics.length;i++){
            if (topics[i]['id'] == id){
                break;
            }
        }
        topics.splice(i,1);
        this.setState({
            topics:topics
        })
        db.collection("topics").doc(id).delete()
    }
    render() {
        if(this.state.loading){
            return(
               <Preloader/> 
            )
        }
        else{
            
            if(this.state.redirect){
                return(<Redirect push to = {this.state.redirect} />)
            }
            return (
                <div>
                    <button className="waves-effect waves-light purple darken-3 btn create-button" onClick ={this.createTopic}>+ Create</button>
                    
                    {
                        this.state.topics.map((topic)=>{
                            console.log(topic,"check my props")
                            return(
                                <Topic id = {topic.id} title = {topic.title} delete = {(id)=>this.deleteTopic(id)} items = {topic.items} />
                            )
                        })
                    }
                </div>
            )
        }
    }
}
export default TopicList
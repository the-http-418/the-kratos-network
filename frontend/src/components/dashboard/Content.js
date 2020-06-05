import React, { Component } from 'react'
import Sidenav from '../layout/Sidenav'
import TopicList from '../content/TopicList'
import Fireapp from '../../config/firebaseConfig'
import {Preloader} from '../utlis/Preloader'

class Content extends Component {
    state = {
        loading:true,
        topics:[]
    }
    componentDidMount(){
        const db = Fireapp.firestore()
        var topics = []
        var count = 0;
        db.collection("topics").get().then(
            (document) => {
                 document.forEach(
                (doc)=>{
                     //check for user   
                     var x = doc.data()
                     x['id'] = doc.id
                     topics.push(x);
                })
            this.setState({
                topics:topics,
                loading:false
            });
            }
        )
         
    }
    render() {
        if(this.state.loading){return(<Preloader/>)}
        else{
        return (
            <div className="george wrapper">
                
                <Sidenav topics = {this.state.topics} />
                
                <div class = "content-main">
                    <TopicList topics = {this.state.topics}/>
                </div>
            </div>
        )}
    }
}

export default Content

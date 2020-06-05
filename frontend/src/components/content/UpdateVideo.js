import React, { Component } from 'react'
import Fireapp from '../../config/firebaseConfig'
import {Preloader} from '../utlis/Preloader'
import {Redirect} from 'react-router-dom'
export default class UpdateVideo extends Component {
    state = {
        loading:true,
        video:null,
        content:null,
        id:null,
        progress:0,
        uploading:false,
        redirect:null,
    }
    
    componentWillMount(){
        const db = Fireapp.firestore()
        const id = this.props.match.params.id
        db.collection("videos").doc(id).get().then(
            (doc)=>{
                this.setState({
                    id:id,
                    content:doc.data(),
                    loading:false
                })
            }
        )
    }

    handleVideoChange = (e) =>{
        if(e.target.files[0]){
            const video = e.target.files[0]
            this.setState({
                video:video,
            })

        }
    }

    copyToClipboard = () =>{
        var copyText = document.getElementById("video_url");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }
    
    handleChange = (e) => {
        var x = this.state.content
        x[e.target.id] = e.target.value
        this.setState({
            content:x
        }) 
    }
    
    handleVideoUpload =  () => {
        const { video } = this.state;
        const storage = Fireapp.storage()
        if (video == null ) return;
        this.setState({
            uploading:true
        })
        const uploadTask = storage.ref(`videos/${video.name}`).put(video);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({ progress });
          },
          error => {
            console.log(error);
          },
          () => {
            
            console.log("INSIDE STORAGE")
            storage
              .ref("videos")
              .child(video.name)
              .getDownloadURL()
              .then(url => {
                console.log("INSIDE STORAGE")
                var x = this.state.content
                x['video_url'] = url
                this.setState({
                    uploading:false,
                    content:x,
                });
              });
          }
        );
      };

      handleSubmit = (e,id) =>{
        e.preventDefault()
        const db = Fireapp.firestore()
        db.collection("videos").doc(id).update({
            title:this.state.content['title'],
            description:this.state.content['description'],
            thumbnail:this.state.content['thumbnail'],
            video_url:this.state.content['video_url']
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

    render() {
        if(this.state.redirect){
            return(<Redirect push to={this.state.redirect}/>)
        }
        if(this.state.loading){
            return(<Preloader/>)
        }
        else{
        return (
            <div className = "update-video">
                <div className="wrapper-update-video">
                <form method="POST" className = "update-video-form">
                    <div className="heading">
                        <h5>Videos
                        <button type="button" className = "btn right purple darken-3" onClick={this.handleSubmit}>SAVE</button>
                        </h5><br/><div className="divider purple"></div>
                    </div>
                    <br/>
                    <div className="row">
                    <div className="col s6">
                    <h5>Details</h5>
                    <div class="row">
                        <div class="input-field video-input-field col s8">
                            <input onChange={this.handleChange} id="title" type="text" value ={this.state.content['title']} required />
                            <label className = "active" for="title">Title (required)</label>
                        </div>
                          
                    </div>

                    <div class="row">
                        <div class="input-field video-input-field col s8">
                        <textarea onChange={this.handleChange} value ={this.state.content['description']} placeholder="Give viewers an idea of your video" id="description" style = {{height:"10rem"}} class="materialize-textarea" type='textarea'/>
                        <label className = "active" for="description">Description</label>
                    </div>

                    
                    </div>
                    </div>
                    <div className="col s5">
                        <ThumbNail video = {this.state.video} image = {this.state.content['thumbnail']} />
                        <br/>
                        <div className="files-video-update">
                            <div class="input-field  col s8">
                            <a href = "#" onClick ={()=>{this.copyToClipboard();return false;}}><i class="material-icons purple-text secondary-content">content_copy</i></a>
                                <input onChange={this.handleChange} value ={this.state.content['video_url']} id="video_url" type="text" required />
                                <label className = "active" for="video_url">Video link</label>
                                
                            </div>
                        
                            <div class="file-field input-field col s8">
                                <input onChange = {this.handleVideoChange} id ="gg" type="file"/>
                                <label className = "active" for="gg">Video source</label>
                                <div class="file-path-wrapper">
                                    <input  placeholder= "Add your video file" class="file-path" type="text"/>
                                    
                                </div>
                                
                            </div>
                            
                                
                            
                        </div>
                    </div>
                    
                    </div>
                    <div className="row">   
                        {this.state.uploading?<ProgressBar progress={this.state.progress} />
                        :
                          <div className = "col s6"><button type="button" class="btn right pink darken-3" onClick = {this.handleVideoUpload} >Upload</button></div>
                            
                        } 
                        
                    </div>
                </form>
                </div>
            </div>
        )}
    }
}

class ThumbNail extends Component{
    /*capture = () => {
        var canvas = document.getElementById('canvas');
        var video = document.getElementById('video');
        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    }*/
    render(){
    return(
    <div className="video-area">
        <div className="align-center-text">
            <p>No video uploaded</p> 
        </div>
    </div>)
}}
class ProgressBar extends Component {
    getProgress = () =>{
        return this.props.progress
    }
    render()
     {
        const progress = this.getProgress()
        return (
          <div className="container">
            <div className="progressbar-container">
              <div className="progressbar-complete" style={{width: `${progress}%`}}>
              </div>
              <span className="progress-content">{progress}%</span>
            </div>
          </div>
        )
      }
}

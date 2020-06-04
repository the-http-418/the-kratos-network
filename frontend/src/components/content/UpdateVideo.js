import React, { Component } from 'react'

export default class UpdateVideo extends Component {
    copyToClipboard = () =>{
        console.log("INSSBHJD")
        var copyText = document.getElementById("video-link");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }
    render() {
        return (
            <div className = "update-video">
                <div className="wrapper-update-video">
                <form method="POST" className = "update-video-form">
                    <div className="heading">
                        <h5>Videos
                        <button type="button" className = "btn right purple darken-3" onClick="">SAVE</button>
                        </h5><br/><div className="divider purple"></div>
                    </div>
                    <br/>
                    <div className="row">
                    <div className="col s6">
                    <h5>Details</h5>
                    <div class="row">
                        <div class="input-field video-input-field col s8">
                            <input id="title" type="text" required />
                            <label for="title">Title (required)</label>
                        </div>
                          
                    </div>

                    <div class="row">
                        <div class="input-field video-input-field col s8">
                        <textarea placeholder="Give viewers an idea of your video" id="textarea1" style = {{height:"10rem"}} class="materialize-textarea" type='textarea'/>
                        <label for="textarea1">Description</label>
                        </div>

                    
                    </div>
                    </div>
                    <div className="col s5">
                        <div className="video-area">
                          <div className="align-center-text"><p>No video uploaded</p> 
                          </div>
                        </div>
                        <br/>
                        <div className="files-video-update">
                            <div class="input-field  col s8">
                            <a href = "#" onClick ={()=>{this.copyToClipboard();return false;}}><i class="material-icons purple-text secondary-content">content_copy</i></a>
                                <input id="video-link" type="text" required />
                                <label for="video-link">Video link</label>
                                
                            </div>
                        
                            <div class="file-field input-field col s8">
                                <button class="btn purple darken-3">
                                    Add Video
                                    <input type="file"/>
                                </button>
                                <div class="file-path-wrapper">
                                    <input placeholder= "File Name" class="file-path" type="text"/>
                                </div>
                                
                            </div>
                            
                                
                            
                        </div>
                    </div>
                    
                    </div>
                    <div className="row">    
                        <div className="col s6">
                            <button type="button" class="btn right pink darken-3">Upload</button>
                            
                        </div>
                        <ProgressBar progress="20" />
                    </div>
                </form>
                </div>
            </div>
        )
    }
}

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

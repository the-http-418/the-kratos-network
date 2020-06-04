import React, { Component } from 'react'

export default class UpdateTopic extends Component {
    render() {
        return (
            <div className = "update-topic">
                <div className="wrapper-update-topic">
                <form method="POST" className = "update-topic-form">
                    <div className="heading">
                        <h5>Topic
                        <button type="button" className = "btn right purple darken-3" onClick="">SAVE</button>
                        </h5><br/><div className="divider purple"></div>
                    </div>
                    <br/>
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="title" type="text"/>
                            <label for="title">Title</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                        <textarea id="textarea1" class="materialize-textarea" type='textarea'/>
                        <label for="textarea1">Description</label>
                        </div>
                    </div>
                </form>
                <div class = "action-buttons">
                    <a class="waves-effect waves-light btn action-button purple darken-3"><i class="material-icons left">attach_file</i>Video</a>
                    <a class="waves-effect waves-light btn action-button purple darken-3"><i class="material-icons left">add</i>Deliverable</a>
                </div>

               
                <ul class="collection">
                    <ContentListItem type="video" id="1" name = "topicnamelol"/>
                    <ContentListItem type="video" id="1" name = "topicnamepeep"/>
                </ul>
                </div>
            </div>
        )
    }
}
const ContentListItem = (props) => {
    return (
        
        <li className="collection-item avatar thiscollection">
            
            {
                (props.type == "video")?<i className="avatar-item material-icons circle purple">book</i>
                                       :<i className ="avatar-item material-icons circle purple">assignment</i>
            }
            <br/>
        
            <p className="flow-text topic-text">{props.name}</p>
        </li>
        
    )
}
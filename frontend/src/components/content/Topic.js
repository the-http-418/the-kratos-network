import React, { Component } from 'react'

export default class Topic extends Component {
    render() {
        return (
            <div className = "topic-hah">
                <div className = "topic-title">
                    <h4>Topic Title</h4>
                    <div className = "divider purple darken-3" />
                </div>
                <div className = "topic-item-list">
                    <ul class="collection">
                        <TopicItem type = "video" title ="Introduction" />
                    </ul>
                </div>
            </div>
        )
    }
}


const TopicItem = (props) => {
    return (
        
        <li className="collection-item avatar thiscollection">
            
            {
                (props.type == "video")?<i className="avatar-item material-icons circle purple">book</i>
                                       :<i className ="avatar-item material-icons circle purple">assignment</i>
            }
            <br/>
        
            <p className="flow-text topic-text">{props.title}</p>
        </li>
        
    )
}

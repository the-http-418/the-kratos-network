import React, { Component } from 'react'
import Topic from './Topic'
import {Redirect} from 'react-router-dom'

class TopicList extends Component {
    state = {redirect : null}
    createTopic = () => {
       this.setState({
           redirect : "/topic/2"
       })
    }
    render() {
        if(this.state.redirect){
            return(<Redirect push to = {this.state.redirect} />)
        }
        return (
            <div>
                <button className="waves-effect waves-light purple darken-3 btn create-button" onClick ={this.createTopic}>+ Create</button>
                <Topic></Topic>
            </div>
        )
    }
}
export default TopicList
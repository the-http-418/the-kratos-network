import React, { Component } from 'react'
import Topic from './Topic'
class TopicList extends Component {
    render() {
        return (
            <div>
                <a class="waves-effect waves-light purple darken-3 btn create-button">+ Create</a>
                <Topic></Topic>
            </div>
        )
    }
}
export default TopicList
import React, { Component } from 'react'
import Sidenav from '../layout/Sidenav'
import TopicList from '../content/TopicList'

class Content extends Component {
    
    render() {
        
        return (
            <div className="george wrapper">
                
                <Sidenav/>
                
                <div class = "content-main">
                    <TopicList/>
                </div>
            </div>
        )
    }
}

export default Content

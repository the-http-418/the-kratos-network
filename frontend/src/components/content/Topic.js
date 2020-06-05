import React, { Component } from 'react'
import M from 'materialize-css'
import Fireapp from '../../config/firebaseConfig'
import { Preloader } from '../utlis/Preloader'

export default class Topic extends Component {
    state = {
        id:this.props.id,
        loading:false,
        items:this.props.items,
    }

    
    componentDidMount(){
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
    }
    render() {  
        return (
            <div className = "topic-hah">
                <div className = "topic-title">
                    <div className = "wrapper">
                    <h4>{this.props.title}
                    
                    <a className='dropdown-trigger right' href='#' data-target={`dropdown-${this.state.id}`}><i className="material-icons small purple-text">more_vert</i></a>
                    </h4>
                    
                    <ul id={`dropdown-${this.state.id}`} className='dropdown-content'>
                        <li><a href={`/topic/${this.state.id}`} className='purple-text'>edit<span> <i className="material-icons secondary-content tiny purple-text">edit</i></span></a></li>
                        <li><a href="#!" className='purple-text'>delete<span><i className="material-icons secondary-content tiny purple-text">delete</i></span></a></li>
                    </ul>    
                    
                </div>
                    <div className = "divider purple darken-3" />
                </div>
                <div className = "topic-item-list">
                    <ul class="collection">
                        {
                            
                            (this.state.loading == true)?<Preloader/>
                            :this.state.items.map((topicItem) => {
                               // console.log(topicItem,"TOPICITEM")
                               return( <TopicItem type = {topicItem['type']} title = {topicItem['title']} />)
                            })
                        }
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

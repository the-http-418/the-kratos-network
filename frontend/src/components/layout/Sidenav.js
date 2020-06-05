import React,{Component} from 'react'

class Sidenav extends Component {
    render(){
    return (
        <div class = "wrapper-sidenav purple darken-3">
            <p className="flow-text white-text center">Your Content</p>
            <ul class="collection ">
                
                {
                    this.props.topics.map((topic)=>{
                        return(
                            <li className = "white-text purple darken-3 collection-item">{topic.title}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
}

export default Sidenav
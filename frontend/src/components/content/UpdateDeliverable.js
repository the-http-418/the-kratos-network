import React, { Component } from 'react'

export default class UpdateTopic extends Component {
    render() {
        return (
            <div className = "update-deliverable">
                <div >
                <form method="POST" className = "update-deliverable-form">
                    <div className="heading">
                        <h5>Deliverable
                        <button type="button" className = "btn right purple darken-3" onClick="">SAVE</button>
                        </h5><br/><div className="divider purple"></div>
                    </div>
                    <br/>
                    <div className = "wrapper-update-deliverable-text">
                    <div class="row">
                        <div class="input-field col s12">
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
                    </div>
                    <div className = "wrapper-update-deliverable-num">
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="points" type="number"/>
                            <label for="points">Points</label>
                        </div>
                    </div>
                    <div class="row">
                    <label for="due" class="col s2">Due</label>
                        <div class="input-field col s10">
                            <input id="due" type="datetime-local"/>
                        </div>
                    </div>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}

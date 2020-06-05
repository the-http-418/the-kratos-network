import React, { Component } from 'react'
import Fireapp from '../../config/firebaseConfig'

class CreateAdmin extends Component {
    state = {
        email : '',
        password : '',
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)

        const email = this.state.email
        const password = this.state.password

        Fireapp.auth().createUserWithEmailAndPassword(email, password)
          .then(
              (user) => {
                alert("Sucessfully Created Admin!");
                  this.props.history.push('/createadmin');
              }
          )
          .catch(
              (error) => {
                  var errCode = error.code;
                  var msg = error.message;
                  console.log("create failed",errCode,msg);
              }
          )
    }

    render() {
        return (
            <div className="container">
                <form onSubmit ={this.handleSubmit} className = "white">
                    <h5 className="grey-text text-darken-3">
                        Create New Admin
                    </h5>
                    <div className="input-field">
                        <label htmlFor="email">New Admin Email</label>
                        <input type="email" id = "email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">New Admin Password</label>
                        <input type="password" id = "password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateAdmin

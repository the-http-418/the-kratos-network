import React, { Component } from 'react'
import Fireapp from '../../config/firebaseConfig'

class SuperAdminSignIn extends Component {
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

        Fireapp.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(
            (user) => {
                this.props.history.push('/createadmin');
            }
        )
        .catch(
            (error) => {
                var errCode = error.code;
                var msg = error.message;
                console.log("super login failed",errCode,msg);
            }
        )
    }
    render() {
        return (
            <div className="container">
                <form onSubmit ={this.handleSubmit} className = "white">
                    <h5 className="grey-text text-darken-3">
                        Super Admin Sign In
                    </h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id = "email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id = "password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">
                            Super Login
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SuperAdminSignIn

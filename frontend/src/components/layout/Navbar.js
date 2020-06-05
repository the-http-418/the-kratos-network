import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import Fireapp from '../../config/firebaseConfig'
import M from 'materialize-css'
import {NavLink} from 'react-router-dom'

class Navbar extends Component {

    state = {
        links:null
    }

    componentDidMount(){
        Fireapp.auth().onAuthStateChanged(
        (user) => {
            if(user)
                this.setState({
                    links:<SignedInLinks/>
                })
            else{
                this.setState({
                    links:<SignedOutLinks/>
                })
            }
        })
    }
    render(){
      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
      });
    console.log("from heret",this.state.links)
    return (
        <div className="navbar-fixed">
        <nav className="nav-wrapper purple darken-3 ">
        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <div className="container">
            <Link to = '/' className="brand-logo">The Kratos Network</Link>
              { this.state.links }
          </div>
        </nav>
        <ul className="sidenav" id="mobile-demo">
            <li><NavLink to='/createprofile'>Create Profile</NavLink></li>
            <li><NavLink to='/profiles'>Profiles</NavLink></li>
            <li><NavLink to='/content'>Content</NavLink></li>
        </ul>
        </div>
    )}
}
export default Navbar

import React from 'react'
import {Link} from 'react-router-dom'
export default function LandingPage() {
    return (
        <div>
            <h3>Welcome to The Kratos Network!</h3>
            <Link to ='/signin'>
              <div className="btn pink white-text">
                Sign in
              </div>
            </Link>
            <Link to ='/superadminsignin'>
              <div className="btn blue white-text">
                Super Admin Sign In
              </div>
            </Link>
            <hr/>
            <hr/>
            Current Routes:<br></br>
            / - landing page<br/>
            /signin - signin page<br/>
            /signup - signup page (maybe not needed)<br/>
            /profiles - takes you to the dashboard<br/>
            /createprofile - to create a new profile<br/>
            /profile/:name/:id - to view the profile (public link anyone can access)<br/>
            /editprofile/:name/:id - to edit a profile<br/>
            /generatedProfile/:name/:id - profile preview area<br/>
        </div>
    )
}

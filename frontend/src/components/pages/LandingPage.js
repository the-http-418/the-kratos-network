import React from 'react'

export default function LandingPage() {
    return (
        <div>
            this is your landing page.<br/><hr/>
            your routes:<br></br><hr/>
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

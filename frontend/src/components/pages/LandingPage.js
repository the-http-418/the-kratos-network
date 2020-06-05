import React from 'react'
import {Link} from 'react-router-dom'
export default function LandingPage() {
    return (
        <div className='loginstuff'>
            <h3>Welcome to The Kratos Network!</h3>
            <div>
            <Link to ='/signin'>
              <div className="btn pink white-text">
                Sign in
              </div>
            </Link>
            <br/>
            <br/>
            <Link to ='/superadminsignin'>
              <div className="btn blue white-text">
                Super Admin Sign In
              </div>
            </Link>
            </div>
        </div>
    )
}

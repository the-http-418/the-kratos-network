import React from 'react'
import CreateProfile from './CreateProfile'
class EditProfile extends React.Component{
    state = {
        profile:{
            'bio':{
                'profilePicture' : null,
                'firstName' : '',
                'lastName' : '',
                'header' : '',
                'designation' : '',
                'links' : [],
            },
            'education':[],
            'workExperience':[]
        }
    }
    componentWillMount(){
        //firebase auth to get profile
        const profile= {
            'bio':{
                'profilePicture' : '/img/default_dp.jpg',
                'firstName' : 'PAtrick',
                'lastName' : 'Rashidi',
                'header' : 'Zaio Dev',
                'designation' : 'Full stack developer and automation',
                'links' : ['youtube.com','github.com'],
                },
            'education':[{"collegeName":"Harvard","stream":"Computer science and engineering","accolade":"Graduated with diploma"}],
            'workExperience':
                [{"companyName":"Aerobotics","role":"Devops Intern","startDate":"December 2019","endDate":"Present","description":"Build and align aerial imagery taken with drones and troubleshoot where automated processing failed. Also Trac image processing jobs using the web based platform and SQL."},]
        }
        this.setState({
            profile : profile
        })
        
    }

    render(){
        console.log("in edit profile ..",this.state.profile)
        return(
        <div>
            <CreateProfile edit = {true} profile={this.state.profile} />
        </div>
    )
    }
}
export default EditProfile
import React from 'react'
import {EducationList} from '../elements/Education'
import {ExperienceList} from '../elements/Experience'
import {Bio} from '../elements/BasicInfo'
export default function Profile() {
    return (
        <div>
            this is profile
            <div class="col s12 m5">
            <div class="card-panel white">
                <Bio />
            </div>
            </div>
            <div class="col s12 m5">
            <div class="card-panel white">
                <EducationList />
            </div>
            </div>
            <div class="col s12 m5">
            <div class="card-panel white">
                <ExperienceList />
            </div>
            </div>
                
        </div>
    )
}

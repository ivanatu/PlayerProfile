import React, { useState, useEffect, useContext, Fragment } from 'react'

import ProfileContext from '../../context/profiles/profileContext';

let emptyProfile = {
    bio: "",
    courses: []
}

const CreateProfile = ({ profile = emptyProfile, prompt }) => {
    let coursesString = ""
    // TODO: Test this
    if (profile !== null) {
        profile.courses.forEach(course => coursesString = coursesString + "," + course);
        coursesString = coursesString.substring(1, coursesString.length);
    }

    const profileContext = useContext(ProfileContext);
    const { uploadProfile } = profileContext;

    const [profileForm, setProfile] = useState({ ...profile, courses: coursesString });

    const { bio, courses } = profileForm;

    const onChange = e => setProfile({ ...profileForm, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        uploadProfile({
            ...profileForm
        });

    }

    return (
        <Fragment>
            <div className="card-md create-profile-margin">
                <h2> {prompt} </h2>
                <form onSubmit={onSubmit}>
                    <label htmlFor="bio"> Player game name </label>
                    <input type="text" name="bio" id="bio" placeholder="Bio" className="input" value={bio} onChange={onChange} />
                    <label htmlFor="bio"> Name of game </label>
                    <input type="text" name="courses" id="courses" placeholder="BIOL102,CHEM112,MATH121..." className="input" value={courses} onChange={onChange} />
                    <a href="#" className="register-btn">
                        <input type="submit" value="Save" className="btn-primary" />
                    </a>
                </form>
            </div>
        </Fragment>
    )
}

export default CreateProfile;
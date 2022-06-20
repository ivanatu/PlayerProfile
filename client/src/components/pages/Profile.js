import React, { Fragment, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PlayerRequestButton from '../players/PlayerRequestButton';

import AlertContext from '../../context/alert/alertContext';

const Profile = ({ match, location }) => {
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const [profileState, setProfile] = useState({
        loading: true,
        exists: false,
        profile: {}
    });

    let courseElements;

    const getProfile = async (id) => {
        try {
            const res = await axios.get(`../api/profile/byid/${match.params.id}`);

            courseElements = res.data.courses.map((course, index) =>
                <       li key={index} className="profile-text"> {course} </li>
            );

            setProfile({
                loading: false,
                exists: true,
                profile: res.data
            })
        } catch (err) {
            setAlert('Couldn\'t load profile', 'danger');
            setProfile({
                loading: false,
                exists: false,
                profile: null
            });
        }
    }

    useEffect(() => {
        getProfile();

    }, []);

    const { _id, user, bio } = profileState.profile;

    return (
        <Fragment>
            {profileState.loading ?
                (<h2>Loading</h2>)
                :
                (
                    <Fragment>
                        {profileState.exists === false ?
                            (<h2> Profile not found </h2>)
                            :
                            (<div className="viewprofile-group">
                                <div className="card-md player-card player-margin">
                                    <div className="profile-header">
                                        <h1 className="player-text"> {user.name} </h1>
                                        <img className="avatar avatar-player" src={user.avatar} alt='' />
                                    </div>
                                    <div className="profile-info">
                                        <h2 className="profile-text"> {bio} </h2>
                                        <ul className="course-list"> {courseElements} </ul>

                                        <div className="profile-button-group">
                                            <PlayerRequestButton playerid={_id} useThisPlayerInstead={profileState.profile} />
                                        </div>
                                    </div>
                                </div>
                                <Link to={location.state.goBack !== null ?
                                    `${location.state.goBack}`
                                    :
                                    `/home`
                                }>
                                    <button className="btn-med btn-player"> Back </button>
                                </Link>
                            </div>)
                        }
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default Profile;
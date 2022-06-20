import React, { Fragment, useContext } from 'react';

import PlayerRequestButton from './PlayerRequestButton';

const ViewPlayer = ({ profile, closeLargeView }) => {
    const { _id, user, bio, courses } = profile;
    const { avatar } = user;

    let courseElements = courses.map((course, index) =>
        <li key={index} className="profile-text"> {course} </li>
    );

    return (
        <Fragment>
            <div className="card-md player-card player-margin">
                <div className="profile-header">
                    <h1 className="player-text"> {user.name} </h1>

                    <img className="avatar avatar-player" src={avatar} alt='' />
                </div>

                <div className="profile-info">
                    <h2 className="profile-text"> {bio} </h2>
                    <ul className="course-list"> {courseElements} </ul>

                    <div className="profile-button-group">
                        <button onClick={() => closeLargeView(_id)} className="btn-small"> Close </button>
                        <PlayerRequestButton playerid={_id} useThisPlayerInstead={profile} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ViewPlayer;
import React, { Fragment, useContext } from 'react';


const Player = ({ profile, openLargeView }) => {
    const { _id, user, bio, courses } = profile;
    const { avatar } = user;

    return (<Fragment>
        <div className="player-card-small player-margin">
            <div className="profile-header">
                <h1 className="player-text row-title"> {user.name} </h1>
                <img className="avatar avatar-player-small" src={avatar} alt='' />
            </div>
            <button onClick={() => openLargeView(_id)} className="btn-small"> More </button>
        </div>
    </Fragment>)
}

export default Player;
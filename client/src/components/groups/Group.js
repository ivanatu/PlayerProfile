import React, { Fragment } from 'react';

import Join from './Join';

const Group = ({ group, openLargeView }) => {
    const { _id, name, course, members, max_members } = group;

    return (
        <div className="card-row">
            <div className="profile-header">
                <h1 className="player-text row-title"> {name} </h1>
                <p className="player-text player-small"> {course} </p>
                <h2 className="player-text right-row-text"> {members.length}/{max_members} </h2>
            </div>
            <div className="profile-button-group">
                <button className="btn-small" onClick={() => openLargeView(_id)}> More </button>
                <Join group={group} />
            </div>
        </div>
    )
}

export default Group;
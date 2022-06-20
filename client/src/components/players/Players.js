import React, { useState, useEffect, useContext, Fragment } from 'react';

import Player from './Player';
import ViewPlayer from './ViewPlayer';
import PlayerFilter from './PlayerFilter';

import ProfileContext from '../../context/profiles/profileContext';
import PlayersContext from '../../context/players/playersContext';

const Players = () => {
    const profileContext = useContext(ProfileContext);
    const playersContext = useContext(PlayersContext);

    const { user_profile, profile_exists } = profileContext;
    const { players, clearFilter, killFilter, filterByCourse, filtered, changeView, loading, error } = playersContext;

    useEffect(() => {
        if (profile_exists) {
            playersContext.loadPlayers(user_profile.courses);
        }

    }, [profile_exists]);

    const openLargeView = (id) => {
        changeView(id, 'large');
    }

    const closeLargeView = (id) => {
        changeView(id, 'normal');
    }

    const filterButtonClick = (course) => {
        killFilter();
        filterByCourse(course);
    }

    const cancelFilter = () => {
        clearFilter();
    }

    return (loading || players === null ?
        (<Fragment> Loading </Fragment>)
        :
        (<div className="players">
            {players.length === 0 ?
                (<Fragment> No one else has created an account yet </Fragment>)
                :
                (<Fragment>
                    <PlayerFilter />
                    <div className="players-button-group">
                        <button onClick={() => cancelFilter()} className="btn-med btn-player">All</button>
                        {user_profile.courses.map((course, index) => (
                            <button key={index} onClick={() => filterButtonClick(course)} className="btn-med btn-player">{course}</button>
                        ))}
                    </div>
                    <div className="player-cards">
                        {filtered.length === 0 ?
                            players.map((player, index) => {
                                if (index > 10) return;
                                if (player.view === "normal") {
                                    return <Player key={player._id} openLargeView={openLargeView} profile={player} />
                                } else {
                                    return <ViewPlayer key={player._id} closeLargeView={closeLargeView} profile={player} />
                                }
                            })
                            :
                            filtered.map((player, index) => {
                                if (index > 10) return;
                                if (player.view === "normal") {
                                    return <Player key={player._id} openLargeView={openLargeView} profile={player} />
                                } else {
                                    return <ViewPlayer key={player._id} closeLargeView={closeLargeView} profile={player} />
                                }
                            })
                        }
                    </div>
                </Fragment>)}
        </div>)
    )
}

export default Players
import React, { Fragment, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import ProfileContext from '../../context/profiles/profileContext';
import PlayerContext from '../../context/players/playersContext';

/**
 * Maybe this isn't the most memory-efficent approach
 * to a dynamic button. Though it's not like theres hundreds
 * of em at once.
 */
const PlayerRequestButton = ({ playerid, useThisPlayerInstead = null }) => {
    const profileContext = useContext(ProfileContext);
    const playerContext = useContext(PlayerContext);

    const [btn, setBtn] = useState({
        text: 'Button Loading',
        disabled: true
    });

    const { user_profile, sendBuddyRequest, loadProfile } = profileContext;
    const { players, loadPlayers } = playerContext;

    const fetchPlayer = () => {
        // Fetch the player depending if one was passed in as prop
        let findplayer;
        if (useThisPlayerInstead === null) {
            // Check if the player exists
            findplayer = players.filter(p => p._id === playerid);
            if (findplayer.length === 0) {
                return setBtn({
                    text: 'Cannot add',
                    disabled: true
                });
            }
            return findplayer[0];
        } else {
            return useThisPlayerInstead;
        }
    }

    const findRequestState = () => {
        let { _id, user, requests } = fetchPlayer();

        let exists;

        // Check if they're friends already
        exists = user_profile.buddies.filter(buddy => buddy === user._id);
        if (exists.length > 0) {
            return setBtn({
                text: 'Already friends',
                disabled: true
            })
        }

        // Check if player sent a request
        exists = user_profile.requests.filter(request => request === user._id);
        if (exists.length > 0) {
            return setBtn({
                text: 'Accept request',
                disabled: false
            })
        }

        // Check if you have sent a request
        exists = requests.filter(request => request === user_profile.user._id);
        if (exists.length > 0) {
            return setBtn({
                text: 'Buddy request sent',
                disabled: true
            })
        }

        // Set to default
        return setBtn({
            text: 'Send buddy request',
            disabled: false
        })
    }

    useEffect(() => {
        findRequestState();

    }, [useThisPlayerInstead, players]);

    const sendRequest = async () => {
        await sendBuddyRequest(playerid);
        await loadProfile();
        await loadPlayers(user_profile.courses);
    }

    const onClick = () => {
        if (!btn.disabled) {
            sendRequest();
        }
    }

    return (
        <Fragment>
            <button className="btn-small" disabled={btn.disabled} onClick={() => onClick()} >{btn.text}</button>
        </Fragment>
    )
}

export default PlayerRequestButton;
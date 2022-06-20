import React, { useReducer } from 'react';
import axios from 'axios';
import PlayersContext from './playersContext';
import playersReducer from './playersReducer';

import {PLAYERS_LOADED, PLAYERS_FILTER_CURRENT, PLAYERS_CLEAR_SEARCH, PLAYERS_CLEAR_FILTER, PLAYERS_FAIL, PLAYERS_FILTER_SEARCH, PLAYERS_FILTER_COURSE, PLAYERS_SET_CURRENT, CLEAR_ERRORS, LOGOUT } from '../types';

const PlayersState = props => {
    const initialState = {
        players_loaded: false,
        players: [],
        current: null,
        filtered: [],
        cancel_search: false,
        loading: true,
        error: null,
    }

    const [state, dispatch] = useReducer(playersReducer, initialState);

    // Load players
    const loadPlayers = async (courses) => {
        if (courses === null) {
            return dispatch({
                type: PLAYERS_FAIL
            })
        }

        let coursesString = ""
        courses.forEach(course => coursesString = coursesString + "," + course);
        coursesString = coursesString.substring(1, coursesString.length);

        try {
            const res = await axios.get(`/api/profile/byCourse/${coursesString}`);

            let players = res.data.map(player => ({
                ...player,
                view: 'normal'
            }));

            dispatch({
                type: PLAYERS_LOADED,
                payload: players
            })
        } catch (err) {
            dispatch({
                type: PLAYERS_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    // Change View State 
    const changeView = (id, view) => {
        // Map through the players, changing the view state of the one intended
        let players = state.players;
        if (state.filtered.length !== 0) {
            players = state.filtered;
        }

        players = players.map(player => {
            if (player._id === id) {
                return {
                    ...player,
                    view    
                }
            } else {
                return player;
            }
        });

        if (state.filtered.length !== 0) {
            return dispatch({
                type: PLAYERS_FILTER_COURSE,
                payload: players
            })
        }

        dispatch({
            type: PLAYERS_LOADED,
            payload: players
        });
    }

    // Filter by course
    const filterByCourse = course => {
        let filtered = state.players.filter(player => player.courses.includes(course));

        filtered = filtered.map(player => ({
            ...player,
            view: 'normal'
        }));

        dispatch({
            type: PLAYERS_FILTER_COURSE,
            payload: filtered
        });
    }

    // Filter by Search
    const filterSearch = text => {
        dispatch({
            type: PLAYERS_FILTER_SEARCH,
            payload: text
        })
    }

    // Kill the filter
    const killFilter = () => {
        dispatch({
            type: PLAYERS_CLEAR_SEARCH
        })
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({
            type: PLAYERS_CLEAR_FILTER
        })
    }

    // Logout
    const logout = () => {
        dispatch({
            type: LOGOUT
        });
    }

    // Clear Errors
    const clearErrors = () => dispatch({
        type: CLEAR_ERRORS
    });

    return (
        <PlayersContext.Provider value={{
            players_loaded: state.players_loaded,
            players: state.players,
            current: state.current,
            filtered: state.filtered,
            cancel_search: state.cancel_search,
            loading: state.loading,
            error: state.error,
            loadPlayers,
            filterSearch,
            filterByCourse,
            changeView,
            killFilter,
            clearFilter,
            clearErrors,
            logout
        }}>
            {props.children}
        </PlayersContext.Provider>
    )
}

export default PlayersState;
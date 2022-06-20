import { PLAYERS_CLEAR_SEARCH, PLAYERS_FILTER_CURRENT, PLAYERS_LOADED, PLAYERS_CLEAR_FILTER, PLAYERS_FAIL, PLAYERS_CHANGE_VIEW, PLAYERS_FILTER_SEARCH, PLAYERS_FILTER_COURSE, PLAYERS_SET_CURRENT, CLEAR_ERRORS, LOGOUT } from '../types';

export default (state, action) => {
    console.log(action);
    switch (action.type) {

        case PLAYERS_LOADED:
            return {
                ...state,
                players: action.payload,
                players_loaded: true,
                loading: false
            };

        case PLAYERS_FAIL:
            return {
                ...state,
                players_loaded: false,
                error: action.payload
            }

        case PLAYERS_FILTER_COURSE:
            return {
                ...state,
                cancel_search: true,
                filtered: [...action.payload],
            }

        case PLAYERS_FILTER_SEARCH:
            return {
                ...state,
                filtered: state.players.filter(player => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return player.user.name.match(regex);
                }).map(player => {
                    return { ...player, view: 'normal' }
                })
            }

        case PLAYERS_CLEAR_FILTER:
            return {
                ...state,
                cancel_search: true,
                filtered: []
            }

        case PLAYERS_CLEAR_SEARCH:
            return {
                ...state,
                cancel_search: false
            }

        case LOGOUT:
            return {
                players_loaded: false,
                players: [],
                current: null,
                filtered: [],
                loading: true,
                error: null
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;


    }
}
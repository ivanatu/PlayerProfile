import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import ProfileContext from '../../context/profiles/profileContext';
import PlayersContext from '../../context/players/playersContext';
import GroupsContext from '../../context/groups/groupsContext';

const Navbar = props => {
    const authContext = useContext(AuthContext);
    const profileContext = useContext(ProfileContext);
    const playersContext = useContext(PlayersContext);
    const groupsContext = useContext(GroupsContext);

    const { isAuthenticated } = authContext;
    const { profile_exists } = profileContext;

    let navName = "text-center nav-item";

    const onLogout = () => {
        profileContext.logout();
        authContext.logout();
        playersContext.logout();
        groupsContext.logout();
    }

    const authLinks = (
        <Fragment>

            {profile_exists &&
                (<Fragment>
                    <Link to="/studyview" className={navName}>Chat</Link>
                    <Link to="/groups" className={navName}>Groups</Link>
                    <Link to="/players" className={navName}> Players </Link>
                    {/*<Link to="/newgroup" className={navName}> NewGroup </Link>*/}
                </Fragment>)
            }
            <Link to="/home" className={navName}> Dashboard </Link>
            <a onClick={onLogout} href="#!" className={navName}> Logout </a>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <Link to="/" className={navName}>Home</Link>
            <Link to="/login" className={navName}>Login</Link>
            <Link to="/register" className={navName}>Register</Link>
        </Fragment>
    );

    return (
        <div className="navbar">
            <Link to="/home">
                <h1 className="navbar-brand">Player Platform</h1>
            </Link>
            <div className="menu navs">
                {isAuthenticated ? authLinks : guestLinks}
            </div>
            <input id="menu-toggle" className="menu-toggle text-center" type="checkbox" />
            <label htmlFor="menu-toggle">
                <i className="fas fa-bars"></i>
            </label>
            <div className="menu-toggle-items">
                {isAuthenticated ? authLinks : guestLinks}
            </div>
        </div>
    )
}

export default Navbar;
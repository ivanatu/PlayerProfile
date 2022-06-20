import React, { useContext, useState, useRef, useEffect } from 'react';

import PlayerContext from '../../context/players/playersContext';

const PlayerFilter = () => {
    const playerContext = useContext(PlayerContext);

    const text = useRef('');

    const { filterSearch, cancel_search, killFilter, clearFilter, filtered } = playerContext;

    useEffect(() => {
        if (cancel_search) {
            text.current.value = "";
            killFilter();
        }

    }, [cancel_search]);

    // add control state to avoid clearFilter spam as for course filter buttons
    const [filtering, setFiltering] = useState(false);

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    })

    const onChange = e => {
        if (text.current.value !== '') {
            filterSearch(e.target.value);
            setFiltering(true);
        }

        if (text.current.value === '' && filtering) {
            clearFilter();
            setFiltering(false);
        }
    }

    return (
        <div className="search-bar-wrapper">
            <form>
                <input className="search-bar" type="text" ref={text} placeholder="Search..." onChange={onChange} />
            </form>
        </div>
    )
}

export default PlayerFilter;
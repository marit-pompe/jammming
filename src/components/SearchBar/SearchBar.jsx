import React, { useState } from 'react';
import './SearchBar.module.css';

function SearchBar({ onSearch }) {

    const [query, setQuery] = useState(''); 


    const handleSearch = () => {
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <div className='search-bar'>
            <input 
            placeholder='Search for a song, album or artist'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;
import React, { useState } from 'react';
import './SearchBar.module.css';

function SearchBar({ onSearch }) {

    const [query, setQuery] = useState(''); 

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
            onSearch(query);
    };

    return (
        <div className='search-bar'>
            <input 
                type='text'
                value={query}
                onChange={handleInputChange}
                placeholder='Search for a song, album or artist'
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;
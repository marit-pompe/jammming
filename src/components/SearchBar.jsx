import { useState } from 'react';

function SearchBar({ onSearch }) {

    const [query, setQuery] = useState(''); 

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='search-bar'>
            <input 
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder='Search for a song or artist'
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

export default SearchBar;
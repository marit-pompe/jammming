import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';

function App() {

    const [results, setResults] = useState([]);

    const handleSearch = (query) => {
        alert(`Searching for: ${query}`);
        setResults([`Track 1: ${query}`, `Track 2: ${query}`, `Track 3: ${query}`])
    }
    
    return (
            <div className='app'>
                <h1>Jammming App</h1>
                <SearchBar onSearch={handleSearch} />
                <div>
                    <h2>Search Results:</h2>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>{result}</li>
                        ))}
                    </ul>
                </div>
            </div>
    )
};

export default App;
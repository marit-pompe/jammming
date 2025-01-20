import Tracklist from '../Tracklist/Tracklist';
import './SearchResults.module.css';

function SearchResults({ searchResults, onAdd }) {
    return (
        <div className='SearchResults'>
            <h2>Search Results</h2>
            {(!searchResults || searchResults.length === 0) ? (
                <p>No results found.</p> ) : (
                <Tracklist 
                    tracks={searchResults || []}
                    onAdd={onAdd}
                    isRemoval={false}
                />
                )}
        </div>
    );
}

export default SearchResults;
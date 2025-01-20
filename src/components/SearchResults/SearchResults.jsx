import React, { useState, useEffect } from 'react';
import Tracklist from '../Tracklist/Tracklist';
import './SearchResults.module.css';

function SearchResults({ searchResults, onAdd }) {
    const [playing, setPlaying] = useState(null);
    const [audio, setAudio] = useState(null);

    const handlePlayPause = (previewUrl) => {
        if (audio && audio.src === previewUrl) {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        } else {
            if (audio) {
                audio.pause();
            }

            const newAudio = new Audio(previewUrl);
            newAudio.play();
            setAudio(newAudio); 
        }

        setPlaying(audio);
    };
    
    useEffect(() => {
        return () => {
            if (audio) {
                audio.pause();
            }
        };
    }, [audio]);

    return (
        <div className='SearchResults'>
            <h2>Search Results</h2>
            {(!searchResults || searchResults.length === 0) ? (
                <p>No results found.</p> ) : (
                <Tracklist 
                    tracks={searchResults || []}
                    onAdd={onAdd}
                    isRemoval={false}
                    handlePlayPause={handlePlayPause}
                    playing={playing}
                />
                )}
        </div>
    );
}

export default SearchResults;
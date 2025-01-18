import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import './App.module.css';

function App() {

    const [searchResults, setSearchResults] = useState([]);

    const [playlist, setPlaylist] = useState([]);

    const [playlistName, setPlaylistName] = useState('New Playlist');

    const MOCK_TRACKS = [
        { id: 1, name: 'Song 1', artist: 'Artist 1', album: 'Album 1', uri: 'spotify:track:1' },
        { id: 2, name: 'Song 2', artist: 'Artist 2', album: 'Album 2', uri: 'spotify:track:2' },
        { id: 3, name: 'Song 3', artist: 'Artist 3', album: 'Album 3', uri: 'spotify:track:3' },
        { id: 4, name: 'Song 4', artist: 'Artist 4', album: 'Album 4', uri: 'spotify:track:4' },
    ]
    
    const handleSearch = (query) => {
        const filteredTracks = MOCK_TRACKS.filter(
            (track) =>
                track.name.toLowerCase().includes(query.toLowerCase()) ||
                track.artist.toLowerCase().includes(query.toLowerCase()) ||
                track.album.toLowerCase().includes(query.toLowerCase())           
        );
        setSearchResults(filteredTracks);
    }

    const addTrackToPlaylist = (track) => {
        if (!playlist.find((item) => item.id === track.id)) {
            setPlaylist([...playlist, track]);
        }
    };

    const removeTrackFromPlaylist = (track) => {
        setPlaylist(playlist.filter((item) => item.id !== track.id));
    }

    const savePlaylist = () => {
        if (!playlistName || playlist.length === 0) {
            alert('Please provide a playlist name and add at least one track.');
            return;
        }

        const trackUris = playlist.map(track => track.uri);
        console.log(`Saving playlist:`, { name: playlistName, uris: trackUris });

        alert(`Playlist '${playlistName}' saved to Spotify!`);

        setPlaylist([]);
        setPlaylistName('New Playlist');
    };

    return (
            <div className='app'>
                <h1>Jammming App</h1>
                <SearchBar onSearch={handleSearch} />
                <SearchResults 
                    searchResults={searchResults} 
                    onAdd={addTrackToPlaylist} 
                />
                <Playlist 
                    playlist={playlist}
                    playlistName={playlistName}
                    onNameChange={setPlaylistName}
                    onRemove={removeTrackFromPlaylist}
                    onSave={savePlaylist}
                />
            </div>
    )
};

export default App;
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import { getAuthorizationUrl, getAccessTokenFromUrl, isAccessTokenValid, refreshAccessToken  } from './components/Spotify/Spotify';
import styles from './App.module.css';

function App() {
    const [accessToken, setAccessToken] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState('New Playlist');

    const storeTokens = (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    };

    const getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };
    const getRefreshToken = () => {
        return localStorage.getItem('refreshToken');
    };

    useEffect(() => {
        const handleToken = async () => {
            const tokenFromUrl = getAccessTokenFromUrl();
            if (tokenFromUrl) {
                storeTokens(tokenFromUrl); 
                setAccessToken(tokenFromUrl);
            } else {
                const storedToken = getAccessToken();
                if (storedToken && isAccessTokenValid(storedToken)) {
                    setAccessToken(storedToken);
                } else {
                    const refreshToken = getRefreshToken();
                    if (refreshToken) {
                        const newAccessToken = await refreshAccessToken(refreshToken);
                        if (newAccessToken) {
                            setAccessToken(newAccessToken);
                        } else {
                            console.warn('Failed to refresh token, redirecting to login.');
                            window.location.href = getAuthorizationUrl();
                        }
                    } else {
                        console.warn('No valid tokens found, redirecting to login.');
                        window.location.href = getAuthorizationUrl();
                    }
                }
            }
        };

        handleToken();
    }, []);

    useEffect(() => {
        const checkTokenValidity = async () => {
            if (!accessToken) return;

            try {
                const response = await fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    console.log('Token is invalid. Redirecting to login...');
                    alert('Your session has expired. Please log in again.');
                    window.location.href = getAuthorizationUrl();
                } else {
                    const data = await response.json();
                    console.log('User data:', data);
                }
            }   catch (error) {
                console.error('Error checking token validity:', error);
            }
        };

        checkTokenValidity();
    }, [accessToken]);

    const handleSearch = async (query) => {
        if (!accessToken) return;

        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(endpoint, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch search results from Spotify');
            }

            const data = await response.json();
            const tracks = data.tracks.items.map((track) => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                preview_url: track.preview_url,
            }));

            setSearchResults(tracks);
            } catch (error) {
                console.error('Error fetching search results:', error);
                alert('An error occurred while searching for tracks.');
            }
        };

    const addTrackToPlaylist = (track) => {
        if (!playlist.find((item) => item.id === track.id)) {
            setPlaylist([...playlist, track]);
        }
    };

    const removeTrackFromPlaylist = (track) => {
        setPlaylist(playlist.filter((item) => item.id !== track.id));
    }

    const savePlaylist = async () => {
        if (!playlistName || playlist.length === 0) {
            alert('Please provide a playlist name and add at least one track.');
            return;
        }

        const trackUris = playlist.map(track => track.uri);

        try {

            const userResponse = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!userResponse.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await userResponse.json();
            const userId = userData.id;

            const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: playlistName,
                description: 'My custom playlist',
                public: true,
              }),
            });

            if (!createPlaylistResponse.ok) {
                throw new Error('Failed to save the playlist');
            }

            const createdPlaylist = await createPlaylistResponse.json();

            const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${createdPlaylist.id}/tracks`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uris: trackUris
                }),
            });

            if (!addTracksResponse.ok) {
                throw new Error('Faild to add tracks to playlist');
            }

            alert(`Playlist ${playlistName} saved to Spotify!`);
            setPlaylist([]);
            setPlaylistName('New Playlist');
        } catch (error) {
            console.error('Error saving playlist:', error);
            alert('An error occurred while saving the playlist.');
        }
    };

    return (
            <div className={styles.app}>
                <h1>Ja<span style={{ color: '#f9b17a' }}>mmm</span>ing</h1>
                {accessToken ? (
                    <div>
                        <h2>You are logged in!</h2>
                    </div>
                ) : (
                    <div>
                       <h2>Login with Spotify</h2> 
                    </div>
                )}
                <div className={styles.app_container}>
                    <div className={styles.search}>
                        <SearchBar onSearch={handleSearch} />
                        <SearchResults 
                            searchResults={searchResults} 
                            onAdd={addTrackToPlaylist} 
                        />
                    </div>
                    <div className={styles.playlist}>
                        <Playlist 
                            playlist={playlist}
                            playlistName={playlistName}
                            onNameChange={setPlaylistName}
                            onRemove={removeTrackFromPlaylist}
                            onSave={savePlaylist}
                        />
                    </div>
                </div>
            </div>
    );
}

export default App;
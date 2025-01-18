import Tracklist from '../Tracklist/Tracklist';

function Playlist({ playlist, playlistName, onNameChange, onRemove, onSave }) {
    
    const handleNameChange = (e) => {
        onNameChange(e.target.value);
    }

    const handleSave = () => {
        if (onSave) {
            onSave();
        }
    };
    
    return (
        <div className='Playlist'>
            <input
                type='text'
                value={playlistName}
                onChange={handleNameChange}
                placeholder='Enter playlist name'
            />
            {(!playlist || playlist.length === 0 ) ? (
                <p>Your playlist is empty. Add some tracks!</p>
            ) : (
                <Tracklist 
                tracks={playlist}
                onRemove={onRemove}
                isRemoval={true} 
                />
            )}
            <button onClick={handleSave}>Save to Spotify</button>
        </div>
    );
};

export default Playlist;
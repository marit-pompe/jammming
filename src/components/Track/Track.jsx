import './Track.module.css';

function Track({ track, onAdd, onRemove, isRemoval, handlePlayPause, playing }) {

    console.log(track.preview_url);
    const handleAdd = () => {
        if (onAdd) {
            onAdd(track);
        }
    };

    const handleRemove = () => {
        if (onRemove) {
            onRemove(track);
        }
    };

    const handlePlayClick = () => {
        if (track.preview_url) {
            handlePlayPause(track.preview_url);
        }
    };

    return (
        <div className='Track'>
            <div>
                <h3>{track.name}</h3>
                <p>
                    {track.artist} | {track.album}
                </p>
            </div>
            {isRemoval ? (
                <button onClick={handleRemove}>Remove</button>
            ) : (
                <button onClick={handleAdd}>Add</button>
            )}
            {track.preview_url ? (
                <button onClick={handlePlayClick}>
                    {playing && playing.src === track.preview_url ? 'Pause' : 'Play'} 
                </button>
            ) : (
                <span>No audio preview available</span>
            )}
        </div>
    );
};

export default Track;
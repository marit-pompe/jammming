import './Track.module.css';

function Track({ track, onAdd, onRemove, isRemoval }) {

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
        </div>
    );
};

export default Track;
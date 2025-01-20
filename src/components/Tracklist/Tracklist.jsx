import Track from '../Track/Track';
import './Tracklist.module.css';

function Tracklist({ tracks, onAdd, onRemove, isRemoval, handlePlayPause, playing }) {
     return (
        <div className='Tracklist'>
             {tracks.map((track) => (
                <Track 
                key={track.id}
                track={track}
                onAdd={onAdd}
                onRemove={onRemove}
                isRemoval={isRemoval}
                handlePlayPause={handlePlayPause}
                playing={playing}
                />
             ))}
        </div>
     )
}

export default Tracklist;
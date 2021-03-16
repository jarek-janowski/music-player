import SongListItem from './SongListItem';
import './Songs.scss'

const Songs = ({ songs, currentSong, handleSelectSong, audioRef, setIsPaused }) => {
  
  return (
    <section className="songs">
      
      <h2 className="songs__heading">Songs</h2>
      
      <ul className="songs__list">
        {songs.map(song => (
          <SongListItem
            key={song.album.cover_medium}
            song={song}
            isCurrent={song.preview === currentSong.preview}
            onSelect={handleSelectSong} 
            setIsPaused={setIsPaused} 
            audioRef={audioRef}
          />))}
      </ul>
    </section>
  );
};

export default Songs;
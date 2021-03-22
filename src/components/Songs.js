import SongListItem from './SongListItem';
import './Songs.scss'

const Songs = ({ 
  songs, 
  currentSong, 
  handleSelectSong, 
  audioRef, 
  setIsPaused,
  addToFavourites,
  favourites,
}) => {

  return (
    <section className="songs">
      <h2 className="songs__heading">Songs</h2>
      <ul className="songs__list">
        {songs.map(song => (
          <SongListItem
            key={song.id}
            song={song}
            isCurrent={song.preview === currentSong.preview}
            onSelect={handleSelectSong} 
            setIsPaused={setIsPaused} 
            audioRef={audioRef}
            addToFavourites={addToFavourites}
            favourites={favourites}
          />))}
      </ul>
    </section>
  );
};

export default Songs;
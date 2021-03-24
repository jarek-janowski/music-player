import SongListItem from './SongListItem';
import './Songs.scss'

const Songs = ({ 
  songs, 
  currentSong, 
  handleSelectSong, 
  audioRef, 
  setIsPaused,
  addRemoveFavouritesFromList,
  favourites,
  currentPlaylist
}) => {
  


  return (
    <section className="songs">
      <h2 className="songs__heading">{currentPlaylist === "all" ? "All songs" : "Favourites"}</h2>
        <ul className="songs__list">
          {songs.length === 0 ? "dodaj coś" :
        songs.map(song => (
          <SongListItem
            key={song.id}
            song={song}
            isCurrent={song.preview === currentSong.preview}
            onSelect={handleSelectSong} 
            setIsPaused={setIsPaused} 
            audioRef={audioRef}
            addRemoveFavouritesFromList={addRemoveFavouritesFromList}
            favourites={favourites}
            currentPlaylist={currentPlaylist}
          />))}
      </ul>
    </section>
  );
};

export default Songs;
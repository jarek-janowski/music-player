import SongListItem from './SongListItem';

const Songs = ({ songs, currentSong, handleSelectSong, audioRef, setIsPaused }) => {
  return (
    <section>
      <h2>Songs</h2>
      <ul>
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
import SongListItem from './SongListItem';

const Songs = ({ songs, currentSong, handleSelectSong, audioRef }) => {
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
            audioRef={audioRef}/>))}
      </ul>
    </section>
  );
};

export default Songs;
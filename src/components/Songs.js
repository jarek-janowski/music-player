import SongListItem from './SongListItem';
import './Songs.scss'

const Songs = ({ 
  song, 
  handlePlayPause, 
  isPaused, 
  songs, 
  currentSong, 
  handleSelectSong, 
  audioRef, 
  setIsPaused, 
  progressRef,
  progress
}) => {

  const {album, title, artist} = song

  const pauseIcon = <i className="fa fa-pause" aria-hidden="true"></i>
  const playIcon = <i className="fa fa-play" aria-hidden="true"></i>
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
      
      <div className="fixed-player">
        <div ref={progressRef} className="fixed-player__progress-container" >
          <div style={{width: (progress * 100) + '%'}} >
          </div>
        </div>
        <img className="fixed-player__image" src={album.cover_small} alt={`${title} cover`}/>
        <div className="fixed-player__info">
          <h3 className="fixed-player__title">{title}</h3>
          <p className="fixed-player__artist">{artist.name}</p>
        </div>
        <button className="fixed-player__button" onClick={handlePlayPause}>{isPaused ? playIcon : pauseIcon}</button>
      </div>
    </section>
  );
};

export default Songs;
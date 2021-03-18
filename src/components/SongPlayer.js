import './SongPlayer.scss'

const SongPlayer = ({ 
  audioRef,
  progressRef,
  song, 
  nextSong, 
  prevSong, 
  handlePlayPause, 
  isPaused, 
  startSetProgressBar,
  stopSetProgressBar,
  setProgressBar,
  progress,
  currentTime,
  duration,
  }) => {
    
  const { preview, album, title, artist } = song;

  const previousIcon = <i className="fa fa-step-backward" aria-hidden="true"></i>
  const nextIcon = <i className="fa fa-step-forward" aria-hidden="true"></i>
  const pauseIcon = <i className="fa fa-pause" aria-hidden="true"></i>
  const playIcon = <i className="fa fa-play" aria-hidden="true"></i>
  
  return (
    <section className="song-player">
      <h1 className="song-player__heading">Music player</h1>
      <img
        className="song-player__image"
        src={album.cover_big}
        alt={`${title} cover`} />
      <div className="info-wrapper">
        <h2 className={title.length > 28 ? "song-player__title--if-length" : "song-player__title"}>
          <span className={title.length > 28 ? "song-player__title--if-length--animation" : ""}>{title}</span>
        </h2>
        <p className="song-player__artist">{artist.name}</p>
      </div>
      <audio ref={audioRef} key={album.cover_medium} autoPlay>
        <source src={preview} />
      </audio>
      <div className="progress-bar">
        <div
          ref={progressRef} 
          onClick={setProgressBar}
          onMouseDown={startSetProgressBar}
          onMouseMove={setProgressBar}
          onMouseLeave={stopSetProgressBar} 
          onMouseUp={stopSetProgressBar}
          className="progress-bar__container">
          <div style={{width: (progress * 100) + '%'}}></div>
        </div>
      </div>
      <div className="timers-wrapper">
        <span className="timers">{currentTime}</span>
        <span className="timers">{duration}</span>
      </div>
      <div className="song-player__controls">
        <div className="button-wrapper">
          <button className="song-player__button" onClick={() => prevSong(song)}>{previousIcon}</button>
          <button className="song-player__button song-player__button--play" onClick={handlePlayPause}>{isPaused ? playIcon : pauseIcon}</button>
          <button className="song-player__button" onClick={() => nextSong(song)}>{nextIcon}</button>
        </div>
      </div>
    </section>
  );
};

export default SongPlayer;
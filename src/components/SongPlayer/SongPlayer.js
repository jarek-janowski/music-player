import { useState, useEffect } from 'react';
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
  addRemoveFromFavourites,
  }) => {
  const { audioUrl, cover, title, artist, id } = song

  const previousIcon = <i className="fa fa-step-backward" aria-hidden="true"></i>
  const nextIcon = <i className="fa fa-step-forward" aria-hidden="true"></i>
  const pauseIcon = <i className="fa fa-pause" aria-hidden="true"></i>
  const playIcon = <i className="fa fa-play" aria-hidden="true"></i>
  const emptyHeart = <i className="fa fa-heart-o" aria-hidden="true"></i>
  const filledHeart = <i className="fa fa-heart" aria-hidden="true"></i>
  
  const audioRefCurrentTime = audioRef.current === null ? "" : Math.floor(audioRef.current.currentTime)
  const audioRefDuration = audioRef.current === null ? "" : Math.floor(audioRef.current.duration)

  const durationInSeconds = audioRefDuration%60 || "0";
  const currentTimeInSeconds = audioRefCurrentTime%60 || "0";
  const currentTimeInMinutes = Math.floor(audioRefCurrentTime/60) || "0";
  const durationInMinutes = Math.floor(audioRefDuration/60) || "0";

  const storageSongs = (JSON.parse(localStorage.getItem('favourites')) || []).map(item => (
    item.id))
  const includes = storageSongs.includes(song.id)
  
  const [startAnimation, setStartAnimation] = useState(24)
  const width = window.screen.width

  useEffect(() => {
    if(width >= 360){
      setStartAnimation(28)
    }
    if(width >= 410){
      setStartAnimation(35)
    }
    if(width >= 1080){
      setStartAnimation(36)
    }
    if(width >= 1366){
      setStartAnimation(39)
    }
  }, [width]);
  
    
  return (
    
    <section className="song-player">
        <img
          className="song-player__image"
          src={cover}
          alt={`${title} cover`} />
      <div className="info-wrapper">
        <div>
        <h2 className={title.length > startAnimation ? "song-player__title--if-length" : "song-player__title"}>
          <span className={title.length > startAnimation ? "song-player__title--if-length--animation" : ""}>{title}</span>
        </h2>
        <p className="song-player__artist">{artist}</p>
        </div>
        <button className="song-player__heart" onClick={addRemoveFromFavourites}>{includes ? filledHeart : emptyHeart}</button>
      </div>
      <audio ref={audioRef} key={id} autoPlay preload="metadata" src={audioUrl} type="audio/mpeg">
        {/* <source  /> */}
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
        <span className="timers timers--current-time">{currentTimeInMinutes}:{currentTimeInSeconds < 10 ? `0${currentTimeInSeconds}` : currentTimeInSeconds}</span>
        <span className="timers timers--duration">{durationInMinutes}:{durationInSeconds < 10 ? `0${durationInSeconds}` : durationInSeconds}</span>
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
import './SongPlayer.scss'
import { useState, useRef, useEffect } from 'react';

const SongPlayer = ({ song, nextSong, prevSong, handlePlayPause, isPaused, audioRef }) => {
 
  const { preview, album, title, artist } = song;
  const [currentTime, setCurrentTime] = useState("0:00")
  const [duration, setDuration] = useState("0:00")
  const [progress, setProgress] = useState(0)
  const [slideProgressBar, setSlideProgressBar] = useState(false)
  const [progressBarUpdateCurrentTime, setProgressBarUpdateCurrentTime] = useState(false)
  const [progressBarUpdateProgress, setProgressBarUpdateProgress] = useState(false);
  const progressRef = useRef();
  // console.log(title.length);
  

  const startSetProgressBar = (e) =>{
    setSlideProgressBar(true)
    setProgressBar(e)
  }

  const stopSetProgressBar = (e) =>{
    setSlideProgressBar(false)
    setProgressBar(e)
  }

  if(progressBarUpdateCurrentTime){
    setProgressBarUpdateCurrentTime(false)
    audioRef.current.currentTime = audioRef.current.duration * progress
  }
  const setProgressBar = (e) =>{
    if(slideProgressBar){
    const progress = (e.clientX - progressRef.current.offsetLeft) / progressRef.current.offsetWidth;
    setProgress(progress)
    setProgressBarUpdateCurrentTime(true);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const parseTime = time => {
        const seconds = String(Math.floor(time % 60) || 0).padStart('2', '0');
        const minutes = String(Math.floor(time / 60) || 0).padStart('1', '0');
        return `${minutes}:${seconds}`
      }
      const {currentTime, duration, ended } = audioRef.current
      setCurrentTime(parseTime(currentTime))
      setDuration(parseTime(duration))
      if(ended){
          nextSong(song);
      }
      if(progressBarUpdateProgress !== audioRef.current){
        setProgressBarUpdateProgress(audioRef.current);
        audioRef.current.addEventListener("timeupdate", e =>{
          if(!progressBarUpdateCurrentTime){
              const {currentTime, duration} = audioRef.current
              setProgress(currentTime/duration)
          }
        }) 
      }
    }, 100);
    return () => clearInterval(intervalId);
  },[audioRef, nextSong, progressBarUpdateProgress, progressBarUpdateCurrentTime, song]);

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
      <audio ref={audioRef} key={album.cover_medium} autoPlay muted>
        <source src={preview} />
      </audio>
      <div className="progress-wrapper">
        <div 
          onClick={setProgressBar}
          onMouseDown={startSetProgressBar}
          onMouseMove={setProgressBar}
          onMouseLeave={stopSetProgressBar} 
          onMouseUp={stopSetProgressBar}
          className="progress">
          <div ref={progressRef} className="progress__bar">
            <div style={{width: (progress * 100) + '%'}}></div>
          </div>
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
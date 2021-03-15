import './SongPlayer.scss'
import { useState, useEffect, useRef } from 'react';

const SongPlayer = ({ song, nextSong, prevSong, audioRef, handlePlayPause, isPaused}) => {
 
  const { preview, album, title } = song;
  const [currentTime, setCurrentTime] = useState("0:00")
  const [duration, setDuration] = useState("0:00")
  const [progress, setProgress] = useState(0.2)
  const progressRef = useRef()
  console.log(progress)
  
  const updateTime = () =>{
  
    const parseTime = time => {
      const seconds = String(Math.floor(time % 60) || 0).padStart('2', '0');
      const minutes = String(Math.floor(time / 60) || 0).padStart('1', '0');
      return `${minutes}:${seconds}`
    }
    const {currentTime, duration } = audioRef.current
    setCurrentTime(parseTime(currentTime))
    setDuration(parseTime(duration))
    if(currentTime >= duration){
      if(audioRef.current.ended){
        nextSong(song);
      }
    }
  }

  const setProgressBar = (e) =>{
    let progress = (e.clientX - progressRef.current.offsetLeft) / progressRef.current.offsetWidth;
    setProgress(progress)
    // console.log(progress)
    // console.log(progressRef.current.offsetLeft, progressRef.current.clientWidth,progressRef.current.offsetWidth, e.clientX)
  }
  
  
  
  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", updateTime);
    
  },);
  // useEffect(() => {
    
  //     const updateTime = () =>{
        
  //       const parseTime = time => {
  //         const seconds = String(Math.floor(time % 60) || 0).padStart('2', '0');
  //         const minutes = String(Math.floor(time / 60) || 0).padStart('1', '0');
  //         return `${minutes}:${seconds}`
  //       }
  //       const {currentTime, duration } = audioRef.current
  //       setCurrentTime(parseTime(currentTime))
  //       setDuration(parseTime(duration))
  //       if(currentTime >= duration){
  //         if(audioRef.current.ended){
  //           nextSong(song);
  //         }
  //       }
  //     }
  //     audioRef.current.addEventListener("timeupdate", updateTime);

  // }, [audioRef, nextSong, song]);
  
  const previousIcon = <i className="fa fa-step-backward" aria-hidden="true"></i>
  const nextIcon = <i className="fa fa-step-forward" aria-hidden="true"></i>
  const pauseIcon = <i className="fa fa-pause" aria-hidden="true"></i>
  const playIcon = <i className="fa fa-play" aria-hidden="true"></i>
  return (
    <section className="song-player">
      <h1 className="song-player__title">Music player</h1>
      <img
        className="song-player__image"
        src={album.cover_medium}
        alt={`${title} cover`} />
      <audio ref={audioRef} key={album.cover_medium} autoPlay>
        <source src={preview} />
      </audio>
      <div className="song-player__controls">
        <span className="song-player__timer">{currentTime}</span>
        <div className="button-wrapper">
          <button className="song-player__button" onClick={() => prevSong(song)}>{previousIcon}</button>
          <button className="song-player__button song-player__button--play" onClick={handlePlayPause}>{isPaused ? playIcon : pauseIcon}</button>
          <button className="song-player__button" onClick={() => nextSong(song)}>{nextIcon}</button>
        </div>
        <span className="song-player__timer">{duration}</span>
      </div>
      <div onClick={setProgressBar} className="progress">
        <div ref={progressRef} className="progress__bar">
          <div style={{width: (progress * 100) + '%'}}></div>
        </div>
      </div>
    </section>
  );
};

export default SongPlayer;
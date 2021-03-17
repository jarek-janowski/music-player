import { useState, useEffect, useRef } from 'react';
import fetchJsonp from 'fetch-jsonp'

import './App.scss';
import SongPlayer from './SongPlayer';
import Songs from './Songs';


function App() {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  
 // prevent autoplay on refresh
  window.onload = onLoad
  function onLoad() {
    audioRef.current.pause()
  }

  const URL = "https://api.deezer.com/playlist/8823756962/tracks?output=jsonp"
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    fetchJsonp(URL)
    .then(response => {
      if (response.ok){
        response.json()
        .then(data =>{
          setSongs(data.data)
        })
      }
    })
  },[])
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const currentSong = songs[currentSongIndex]
  const [isPaused, setIsPaused] = useState(true)
  const [currentTime, setCurrentTime] = useState("0:00")
  const [duration, setDuration] = useState("0:00")
  const [progress, setProgress] = useState(0)
  const [slideProgressBar, setSlideProgressBar] = useState(false)
  const [progressBarUpdateCurrentTime, setProgressBarUpdateCurrentTime] = useState(false)
  const [progressBarUpdateProgress, setProgressBarUpdateProgress] = useState(false);
  

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
    if(progressRef !== null){
      if(slideProgressBar){
      const progress = (e.clientX - progressRef.current.offsetLeft) / progressRef.current.offsetWidth;
      setProgress(progress)
      setProgressBarUpdateCurrentTime(true);
      }
    }
  }

  const handleSelectSong = (selectedSong) =>{
    const audioIndex = songs.findIndex(
      song => song.preview === selectedSong.preview)
      // console.log(audioIndex)
    if (audioIndex >= 0) {
      setCurrentSongIndex(audioIndex)
    }
  }

  const handleNextSong = (selectedSong) =>{
    const audioIndex = songs.findIndex(
      song => song.preview === selectedSong.preview);
    const nextAudio = audioIndex >= songs.length - 1 ? audioIndex - songs.length +1: audioIndex + 1 
      setCurrentSongIndex(nextAudio)
      setIsPaused(false)
  }

  const handlePrevSong = (selectedSong) =>{
    const audioIndex = songs.findIndex(
      song => song.preview === selectedSong.preview);
    const prevAudio = audioIndex <= 0 ? audioIndex + songs.length -1 : audioIndex - 1 
    setCurrentSongIndex(prevAudio) 
    setIsPaused(false)
  }

  const handlePlayPauseSong =() =>{
    if(isPaused){
      setIsPaused(false)
      audioRef.current.play()
    }else if(!isPaused){
      setIsPaused(true)
      audioRef.current.pause()
    }
  }

  useEffect(() => {
    
    const intervalId = setInterval(() => {
      const parseTime = time => {
        const seconds = String(Math.floor(time % 60) || 0).padStart('2', '0');
        const minutes = String(Math.floor(time / 60) || 0).padStart('1', '0');
        return `${minutes}:${seconds}`
      }
      if(audioRef.current !== null) {
        const {currentTime, duration, ended } = audioRef.current
        setCurrentTime(parseTime(currentTime))
        setDuration(parseTime(duration))
        if(ended){
          handleNextSong(currentSong);
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
      }
    }, 100);
    return () => clearInterval(intervalId);
  },);

  return (
    <div className="App">
      {songs.length === 0 
      ? "Loading..." 
      :<>
        <SongPlayer
          audioRef={audioRef}
          progressRef={progressRef} 
          song={currentSong} 
          nextSong={handleNextSong}
          prevSong={handlePrevSong}
          handlePlayPause={handlePlayPauseSong}
          isPaused={isPaused}
          startSetProgressBar={startSetProgressBar}
          stopSetProgressBar={stopSetProgressBar}
          setProgressBar={setProgressBar}
          progress={progress}
          currentTime={currentTime}
          duration={duration}
        />
        <Songs
          audioRef={audioRef} 
          song={currentSong}
          songs={songs} 
          currentSong={currentSong}
          handleSelectSong={handleSelectSong}
          handlePlayPause={handlePlayPauseSong}
          setIsPaused={setIsPaused}
          isPaused={isPaused}
          />
      </>}
    </div>
  );
}

export default App;

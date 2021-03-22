import { useState, useEffect, useRef } from 'react';
import fetchJsonp from 'fetch-jsonp'

import SongPlayer from './SongPlayer';
import Songs from './Songs';
import FixedPlayer from './FixedPlayer'
import Loading from './Loading'
import Favourites from './Favourites'

import './App.scss';

function App() {
  const audioRef = useRef(null);
  const progressRefSongPlayer = useRef(null);
  const progressRefFixedPlayer = useRef(null);
  const URL = "https://api.deezer.com/playlist/8823756962/tracks?output=jsonp"

  // prevent autoplay
  window.onload = function () {
    if(audioRef.current !== null){
    audioRef.current.pause();}
  }
  //scroll to start
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  const [data, setData] = useState([]);
  // const [playlist, setPlaylist] = useState(false);

  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];
  const [isPaused, setIsPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [progressSongPlayer, setProgressSongPlayer] = useState(0);
  const [progressFixedPlayer, setProgressFixedPlayer] = useState(0);
  const [slideProgressBar, setSlideProgressBar] = useState(false);
  const [progressBarUpdateCurrentTime, setProgressBarUpdateCurrentTime] = useState(false);
  const [progressBarUpdateProgress, setProgressBarUpdateProgress] = useState(false);
  const [scrollTop, setScrollTop] = useState(false);
  const [favourites, setFavourites] = useState([]);
  // console.log(currentTime)
  // console.log(duration)
  // console.log(favourites)
  // console.log(songs)
  // console.log(progressSongPlayer)
  useEffect(() => {
    fetchJsonp(URL)
    .then(response => {
      if (response.ok){
        response.json()
        .then(data =>{
          setData(data.data)
          setSongs(data.data)
        })
      }
    })
    const retrievedObject = localStorage.getItem('favourites')
    setFavourites(JSON.parse(retrievedObject))
    // setSongs(JSON.parse(localStorage.getItem('favourites')))
  },[])

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
        // console.log(currentTime)
        // console.log(duration)
        if(ended){
          // console.log(currentSong)
          audioRef.current.currentTime = 0
          handleNextSong(currentSong);
          setProgressSongPlayer(0)
          audioRef.current.play()
        }
        if(progressBarUpdateProgress !== audioRef.current){
          setProgressBarUpdateProgress(audioRef.current);
          audioRef.current.addEventListener("timeupdate", e =>{
            if(!progressBarUpdateCurrentTime){
                const {currentTime, duration} = audioRef.current
                setProgressSongPlayer(currentTime/duration)
                setProgressFixedPlayer(currentTime/duration)
            }
          }) 
        }
      }
    }, 100);
    return () => clearInterval(intervalId);
  },);

  //show FixedPlayer 
  window.addEventListener('scroll',(e) => {
    const scrollTopTarget = e.target.scrollingElement.scrollTop;
    if(scrollTopTarget < 487){
      setScrollTop(false)
    }else if (scrollTopTarget <580){
      setScrollTop(true)
    }
  });

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
    audioRef.current.currentTime = audioRef.current.duration * progressSongPlayer
  }
  const setProgressBar = (e) =>{
    if(progressRefSongPlayer !== null){
      if(slideProgressBar){
        const {offsetLeft, offsetWidth} = progressRefSongPlayer.current
      const progress = (e.clientX - offsetLeft) / offsetWidth;
      setProgressSongPlayer(progress)
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
      audioRef.current.currentTime = 0
      setProgressSongPlayer(0)
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
  
  const handleAddRemoveFavourites = () =>{
    const storageSongs = (JSON.parse(localStorage.getItem('favourites')) || []).map(item => (
      item.id))
    const includes = storageSongs.includes(currentSong.id)
    
    if(!includes){
      const arr = JSON.parse(localStorage.getItem('favourites')) || [];
      arr.push({
        id: currentSong.id,
        title: currentSong.title,
        
        preview: currentSong.preview,
        album: {
          cover_small: currentSong.album.cover_small,
          cover_big: currentSong.album.cover_big
        },
        artist: {
          name: currentSong.artist.name
        }
      })
      localStorage.setItem('favourites', JSON.stringify(arr))
      const retrievedObject = localStorage.getItem('favourites')
      setFavourites(JSON.parse(retrievedObject))
    }else{
      const arr = JSON.parse(localStorage.getItem('favourites')) || [];
      const filtered = arr.filter(el => {
        return el.id !== currentSong.id
      })
      localStorage.setItem('favourites', JSON.stringify(filtered))
      const retrievedObject = localStorage.getItem('favourites')
      setFavourites(JSON.parse(retrievedObject))
    }
  }

  const handleAddToFavouritesFromList = (selectedSong) => {
    const audioIndex = songs.findIndex(
      song => song.preview === selectedSong.preview)
    const addToFavourites = songs[audioIndex]
    const storageSongs = (JSON.parse(localStorage.getItem('favourites')) || []).map(
      item => item.id)
    const includes = storageSongs.includes(addToFavourites.id)

    if(!includes){
      const arr = JSON.parse(localStorage.getItem('favourites')) || [];
      arr.push({
        album: {
          cover_small: addToFavourites.album.cover_small,
          cover_big: addToFavourites.album.cover_big
        },
        artist: {
          name: addToFavourites.artist.name
        },
        id: addToFavourites.id,
        title: addToFavourites.title,
        // artist: addToFavourites.artist.name,
        preview: addToFavourites.preview,
        
      })
      localStorage.setItem('favourites', JSON.stringify(arr))
      const retrievedObject = localStorage.getItem('favourites')
      setFavourites(JSON.parse(retrievedObject))
    }else{
      const arr = JSON.parse(localStorage.getItem('favourites')) || [];
      const filtered = arr.filter(el => {
        return el.id !== addToFavourites.id
      })
      localStorage.setItem('favourites', JSON.stringify(filtered))
      const retrievedObject = localStorage.getItem('favourites')
      setFavourites(JSON.parse(retrievedObject))
    }
  }

  const handleRemoveFromFavouritesListItem = (selectedFav) => {
    const audioIndex = favourites.findIndex(
      fav => fav.id === selectedFav.id)
    const remove = favourites[audioIndex]
    const arr = JSON.parse(localStorage.getItem('favourites')) || [];
    const filtered = arr.filter(el => {
      return el.id !== remove.id
    })
    localStorage.setItem('favourites', JSON.stringify(filtered))
    const retrievedObject = localStorage.getItem('favourites')
    setFavourites(JSON.parse(retrievedObject))
  }

  // const [data, setData] = useState([]);
  

  const handlePlayFavourites = () => {
    setSongs(favourites)
    setIsPaused(false)
  }

  const handlePlayAll = () => {
    setSongs(data)
    setIsPaused(false)
  }

  return (
    <div className="App">
      {songs.length === 0 
      ? <Loading/>
      :<>
        <SongPlayer
          audioRef={audioRef}
          progressRef={progressRefSongPlayer} 
          song={currentSong} 
          nextSong={handleNextSong}
          prevSong={handlePrevSong}
          handlePlayPause={handlePlayPauseSong}
          isPaused={isPaused}
          startSetProgressBar={startSetProgressBar}
          stopSetProgressBar={stopSetProgressBar}
          setProgressBar={setProgressBar}
          progress={progressSongPlayer}
          currentTime={currentTime}
          duration={duration}
          addRemoveFromFavourites={handleAddRemoveFavourites}
          favourites={favourites}
        />
        <Songs
          audioRef={audioRef} 
          songs={songs} 
          currentSong={currentSong}
          handleSelectSong={handleSelectSong}
          setIsPaused={setIsPaused}
          song={currentSong}
          addToFavourites={handleAddToFavouritesFromList}
          favourites={favourites}
          />
        <Favourites
          audioRef={audioRef} 
          favourites={favourites}
          removeFromFavourites={handleRemoveFromFavouritesListItem}
          playFavourites={handlePlayFavourites}
          playAll={handlePlayAll}
        />
        <FixedPlayer
          audioRef={audioRef} 
          handlePlayPause={handlePlayPauseSong}
          isPaused={isPaused}
          progressRef={progressRefFixedPlayer}
          progress={progressFixedPlayer}
          song={currentSong} 
          className={scrollTop ? "fixed-player__show" : "fixed-player__hide"}
          addRemoveFromFavourites={handleAddRemoveFavourites}
          favourites={favourites}
        />
      </>}
    </div>
  );
}

export default App;

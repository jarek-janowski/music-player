import { useState, useEffect, useRef } from 'react';


import SongPlayer from './SongPlayer/SongPlayer';
import Songs from './Songs/Songs';
import FixedPlayer from './FixedPlayer/FixedPlayer'
import Loading from './Loading/Loading'

import './App.scss';

function App() {
  const audioRef = useRef(null);
  const progressRefSongPlayer = useRef(null);
  const progressRefFixedPlayer = useRef(null);
  const URL= "https://music-api-j95.herokuapp.com/songs";
  // prevent autoplay
  window.onload = function () {
    if(audioRef.current !== null){
    audioRef.current.autoplay = false
    }
  }
  
  //scroll to start
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  const [popOut, setPopOut] = useState(false)
  const [data, setData] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState("all");
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];
  const [isPaused, setIsPaused] = useState(true);
  const [progressSongPlayer, setProgressSongPlayer] = useState(0);
  const [progressFixedPlayer, setProgressFixedPlayer] = useState(0);
  const [slideProgressBar, setSlideProgressBar] = useState(false);
  const [progressBarUpdateCurrentTime, setProgressBarUpdateCurrentTime] = useState(false);
  const [progressBarUpdateProgress, setProgressBarUpdateProgress] = useState(false);
  const [scrollTop, setScrollTop] = useState(false);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetch(URL)
    .then(response => {
      if (response.ok){
        response.json()
        .then(data =>{
          setData(data.songs)
          setSongs(data.songs)
        })
      }
    })
  
    const retrievedObject = localStorage.getItem('favourites')
    setFavourites(JSON.parse(retrievedObject))
    if(retrievedObject===null){
      localStorage.setItem('favourites', JSON.stringify([]))
    }
    
  },[])
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if(audioRef.current !== null) {
        if(isPaused){
          clearInterval(intervalId)
        }
        const { ended } = audioRef.current
        if(ended){
          audioRef.current.currentTime = 0
          handleNextSong(currentSong);
          setProgressSongPlayer(0)
          audioRef.current.play()
          clearInterval(intervalId)
        }
        if(progressBarUpdateProgress !== audioRef.current){
          setProgressBarUpdateProgress(audioRef.current);
          audioRef.current.addEventListener("timeupdate", e =>{
            if(!progressBarUpdateCurrentTime){
              if(audioRef.current !== null){
                const {currentTime, duration} = audioRef.current
                setProgressSongPlayer(currentTime/duration)
                setProgressFixedPlayer(currentTime/duration)
                
              }
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
    if(scrollTopTarget < 100){
      setScrollTop(false)
    }else if (scrollTopTarget <700){
      setScrollTop(true)
    }
  });

  
  // if favourites empty back to all songs
  if(favourites !== null){
  if(currentSong === undefined && favourites.length===0 && data.length > 1){
    setSongs(data);
    setCurrentPlaylist("all");
    setProgressSongPlayer(0);
    setProgressFixedPlayer(0);
    if(audioRef.current !== null){
      setIsPaused(true);
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  }
}

  // on progressBar click update currentTime to clicked value
  if(progressBarUpdateCurrentTime){
    setProgressBarUpdateCurrentTime(false)
    audioRef.current.currentTime = audioRef.current.duration * progressSongPlayer
  }

  if(isPaused && audioRef.current !== null){
    audioRef.current.pause();
  }

  //utilities functions
  function findSelectedAudioIndex(selectedSong, songs){
    const audioIndex = songs.findIndex(
      song => song.audioUrl === selectedSong.audioUrl)
      return audioIndex
  }

  function isStorageIncludeSong(currentSong){
    const storageSongs = (JSON.parse(localStorage.getItem('favourites')) || []).map(item => (
      item.id))
    const includes = storageSongs.includes(currentSong.id)
    return includes
  }

  function addToStorage(songObject){
    const arr = JSON.parse(localStorage.getItem('favourites')) || [];
      arr.push({
        artist: songObject.artist,
        audioUrl: songObject.audioUrl,
        cover: songObject.cover,
        id: songObject.id,
        title: songObject.title
      })
      localStorage.setItem('favourites', JSON.stringify(arr))
      const retrievedObject = localStorage.getItem('favourites')
      setFavourites(JSON.parse(retrievedObject))
  }

  function removeFromStorage(songObject){
    const arr = JSON.parse(localStorage.getItem('favourites')) || [];
      const filtered = arr.filter(el => {
        return el.id !== songObject.id
      })
      localStorage.setItem('favourites', JSON.stringify(filtered))
      const retrievedObject = localStorage.getItem('favourites')
      setFavourites(JSON.parse(retrievedObject))
      if(currentPlaylist === "favourites"){
        setSongs(JSON.parse(retrievedObject))
        if(currentSongIndex > 0){
        setCurrentSongIndex(currentSongIndex -1)
      }
      audioRef.current.play()
      }
  }
  //app logic functions

  const startSetProgressBar = (e) =>{
    setSlideProgressBar(true)
    setProgressBar(e)
  }

  const stopSetProgressBar = (e) =>{
    setSlideProgressBar(false)
    setProgressBar(e)
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
    const selectedAudioIndex = findSelectedAudioIndex(selectedSong, songs)
    if (selectedAudioIndex >= 0) {
      setCurrentSongIndex(selectedAudioIndex)
      audioRef.current.play();
      setProgressSongPlayer(0);
      setIsPaused(false);
    }
    if(!isPaused){
      audioRef.current.pause();
      setIsPaused(true);
    }
    if(selectedAudioIndex !== currentSongIndex){
      audioRef.current.play();
      setIsPaused(false);
    }
  }
  const handleNextSong =  () =>{
    const nextAudio = currentSongIndex >= songs.length - 1 ? currentSongIndex - songs.length +1: currentSongIndex + 1 
      setCurrentSongIndex(nextAudio);
      setIsPaused(false);
      audioRef.current.currentTime = 0;
      setProgressSongPlayer(0);
  }

  const handlePrevSong = () =>{
    const prevAudio = currentSongIndex <= 0 ? currentSongIndex + songs.length -1 : currentSongIndex - 1 
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
    const includes = isStorageIncludeSong(currentSong);
    if(!includes){
      addToStorage(currentSong);
    }else{
      removeFromStorage(currentSong)
    }
  }
 
  const handleAddRemoveFavouritesFromList = (selectedSong) => {
    const selectedAudioIndex = findSelectedAudioIndex(selectedSong, songs)
    const addToFavourites = songs[selectedAudioIndex]
    
    const includes = isStorageIncludeSong(addToFavourites);

    if(!includes){
      addToStorage(addToFavourites);
    }else{
      removeFromStorage(addToFavourites)
    }
  }

  const handlePlayFavourites = () => {
    if(favourites.length > 0){
      setSongs(favourites);
      setCurrentSongIndex(0);
      setIsPaused(true);
      setCurrentPlaylist("favourites");
      setPopOut(false);
      setProgressSongPlayer(0);
      setProgressFixedPlayer(0);
      audioRef.current.currentTime = 0;
    }else {
      setPopOut(true);
    }
  }

  const handlePlayAll = () => {
    setSongs(data);
    setCurrentSongIndex(0);
    setIsPaused(true);
    setCurrentPlaylist("all");
    setProgressSongPlayer(0);
    setProgressFixedPlayer(0);
    audioRef.current.currentTime = 0;
  } 

  return (
    <div className="App">
      {songs.length === 0 && currentPlaylist === "all"
      ? <Loading/>
      :<>
        <h1 className="App__heading">Music player</h1>
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
          addRemoveFromFavourites={handleAddRemoveFavourites}
          favourites={favourites}
          currentPlaylist={currentPlaylist}
          data={data}
          songs={songs}
          setCurrentSongIndex={setCurrentSongIndex}
        />
        <Songs
          audioRef={audioRef} 
          songs={songs} 
          currentSong={currentSong}
          handleSelectSong={handleSelectSong}
          setIsPaused={setIsPaused}
          song={currentSong}
          addRemoveFavouritesFromList={handleAddRemoveFavouritesFromList}
          favourites={favourites}
          currentPlaylist={currentPlaylist}
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
          playFavourites={handlePlayFavourites}
          playAll={handlePlayAll}
          currentPlaylist={currentPlaylist}
          data={data}
          favourites={favourites}
          popOut={popOut}
        />
      </>}
    </div>
  );
}

export default App;

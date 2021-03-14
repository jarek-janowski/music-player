import { useState, useEffect, useRef} from 'react';
import fetchJsonp from 'fetch-jsonp'

import './App.css';
import SongPlayer from './SongPlayer';
import Songs from './Songs';

function App() {
  
  const audioRef = useRef();
  window.onload = onLoad
  function onLoad() {
    console.log("po refreshu")
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
  }

  const handlePrevSong = (selectedSong) =>{
    const audioIndex = songs.findIndex(
      song => song.preview === selectedSong.preview);
    const prevAudio = audioIndex <= 0 ? audioIndex + songs.length -1 : audioIndex - 1 
    setCurrentSongIndex(prevAudio)
  }

  return (
    <div className="App">
      {songs.length === 0 
      ? "Loading..." 
      :<>
        <SongPlayer
          audioRef={audioRef} 
          song={currentSong} 
          nextSong={handleNextSong}
          prevSong={handlePrevSong}
          handleSelectSong={handleSelectSong}
        />
        <Songs
          audioRef={audioRef} 
          songs={songs} 
          currentSong={currentSong} 
          handleSelectSong={handleSelectSong}/>
      </>}
    </div>
  );
}

export default App;

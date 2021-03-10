import { useState, useEffect } from 'react';
import fetchJsonp from 'fetch-jsonp'

import './App.css';
import SongPlayer from './SongPlayer';
import Songs from './Songs';

function App() {
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
  
  if (audioIndex >= 0) {
    setCurrentSongIndex(audioIndex)
  }
  }
  return (
    <div className="App">
      {songs.length === 0 
      ? "Loading..." 
      :<>
        <SongPlayer song={currentSong}/>
        <Songs 
          songs={songs} 
          currentSong={currentSong} 
          handleSelectSong={handleSelectSong}/>
      </>}
    </div>
  );
}

export default App;

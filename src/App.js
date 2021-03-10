import { useState, useRef, useEffect } from 'react';
import fetchJsonp from 'fetch-jsonp'

import './App.css';

// import Yesterday from './audio/Borgeous & Zaeden - Yesterday (ak9 & MIDIcal Remix).mp3'
// import Ghost from './audio/Oliver Heldens feat. RUMORS - Ghost.mp3'

const SongPlayer = ({song}) =>{
  const audioRef = useRef();
  const {preview, album, title} = song;
  return(
    <section>
      <h1>Music player</h1>
      <img 
        width="250px" 
        height="250px" 
        src={album.cover_medium} 
        alt={`${title} cover`}/>
      <audio ref={audioRef} key={album.cover_medium} controls>
        <source src={preview}/>
      </audio>
      <div>
        <button onClick={() => audioRef.current.play()}>Play</button>
        <button onClick={() => audioRef.current.pause()}>Pause</button>
      </div>
    </section>
  )
}

function SongListItem({ song, isCurrent, onSelect }) {
  const background = isCurrent ? "lightgreen" : "none";
  const style = { background };
  const handleClick = () =>{
    onSelect(song)
  } 
  return (
    <li style={style} onClick={handleClick}>
      {song.artist.name} - {song.title}
    </li>
  );
}

function App() {
  // const songs = [
  //   {
  //     preview: Yesterday,
  //     album: {
  //       cover_medium: "https://i1.sndcdn.com/artworks-000145438511-vhm9jm-t500x500.jpg"
  //     },
  //     artist: {
  //       name: "Borgeous & Zaeden"
  //     },
  //     title: "Yesterday (ak9 & MIDIcal Remix)",
  //   },
  //   {
  //     preview: Ghost,
  //     album: {
  //       cover_medium: "https://i1.sndcdn.com/artworks-000150106023-0bhzfe-t500x500.jpg"
  //     },
  //     artist: {
  //       name: "Oliver Heldens feat. RUMORS"
  //     },
  //     title: "Ghost",
  //   }
  // ]
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
      :<><SongPlayer song={currentSong}/>
        <section>
          <h2>Songs</h2>
          <ul>
            {songs.map(song => (
              <SongListItem 
                key={song.album.cover_medium} 
                song={song}
                isCurrent={song.preview === currentSong.preview}
                onSelect={handleSelectSong}
              />))}
          </ul>
        </section>
      </>}
    </div>
  );
}

export default App;

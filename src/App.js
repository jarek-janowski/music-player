import { useState, useRef } from 'react';

import './App.css';

import Yesterday from './audio/Borgeous & Zaeden - Yesterday (ak9 & MIDIcal Remix).mp3'
import Ghost from './audio/Oliver Heldens feat. RUMORS - Ghost.mp3'

const SongPlayer = ({song}) =>{
  const audioRef = useRef();
  const {audioUrl, coverUrl, title} = song;
  return(
    <section>
      <h1>Music player</h1>
      <img 
        width="250px" 
        height="250px" 
        src={coverUrl} 
        alt={`${title} cover`}/>
      <audio ref={audioRef} key={coverUrl} controls>
        <source src={audioUrl}/>
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
      {song.title} by {song.artist}
    </li>
  );
}

function App() {
  const songs = [
    {
      audioUrl: Yesterday,
      coverUrl: "https://i1.sndcdn.com/artworks-000145438511-vhm9jm-t500x500.jpg",
      title: "Yesterday (ak9 & MIDIcal Remix)",
      artist: "Borgeous & Zaeden"
    },
    {
      audioUrl: Ghost,
      coverUrl: "https://i1.sndcdn.com/artworks-000150106023-0bhzfe-t500x500.jpg",
      title: "Ghost",
      artist: "Oliver Heldens feat. RUMORS"
      },
  ]

  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const currentSong = songs[currentSongIndex]
  const handleSelectSong = (selectedSong) =>{
    const audioIndex = songs.findIndex(
      song => song.audioUrl === selectedSong.audioUrl)
  
  if (audioIndex >= 0) {
    setCurrentSongIndex(audioIndex)
  }
  }
  return (
    <div className="App">
      <SongPlayer song={currentSong}/>
      <section>
        <h2>Songs</h2>
        <ul>
          {songs.map(song => (
            <SongListItem 
              key={song.coverUrl} 
              song={song}
              isCurrent={song.audioUrl === currentSong.audioUrl}
              onSelect={handleSelectSong}
            />))}
        </ul>
      </section>
    </div>
  );
}

export default App;

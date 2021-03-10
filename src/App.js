import './App.css';
import Yesterday from './audio/Borgeous & Zaeden - Yesterday (ak9 & MIDIcal Remix).mp3'
import Ghost from './audio/Oliver Heldens feat. RUMORS - Ghost.mp3'

const SongPlayer = ({song}) =>{
  return(
    <section>
      <h1>Music player</h1>
      <img 
        width="250px" 
        height="250px" 
        src={song.coverUrl} 
        alt={`${song.title} cover`}/>
      <audio key={song.coverUrl} controls>
        <source src={song.audioUrl}/>
      </audio>
    </section>
  )
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
  const currentSong = songs[1];
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
            />))}
        </ul>
      </section>
    </div>
  );
}

const SongListItem = ({song, isCurrent}) =>{
  return(
    <li style={{background: isCurrent ? "lightgreen" : "none"}}>
      {song.title} by {song.artist}
    </li>
  )
}

export default App;

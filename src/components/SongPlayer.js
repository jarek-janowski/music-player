import { useState, useRef, useEffect} from 'react';

const SongPlayer = ({ song, nextSong, prevSong }) => {
  const { preview, album, title } = song;
  
  const audioRef = useRef();
  console.log(audioRef)
  const [currentTime, setCurrentTime] = useState("0:00")
  const [duration, setDuration] = useState("0:00")
  
  useEffect(() => {
    
      const updateTime = () =>{
        const parseTime = time => {
          const seconds = String(Math.floor(time % 60) || 0).padStart('2', '0');
          const minutes = String(Math.floor(time / 60) || 0).padStart('1', '0');
          return `${minutes}:${seconds}`
        }
        const {currentTime, duration} = audioRef.current
        setCurrentTime(parseTime(currentTime))
        setDuration(parseTime(duration))
      }
      audioRef.current.addEventListener("timeupdate", updateTime);
  },);
  
  return (
    <section>
      <h1>Music player</h1>
      <img
        width="250px"
        height="250px"
        src={album.cover_medium}
        alt={`${title} cover`} />
      <audio ref={audioRef} key={album.cover_medium} controls>
        <source src={preview} />
      </audio>
      <div>
        <button onClick={() => prevSong(song)}>Prev</button>
        <button onClick={() => audioRef.current.play()}>Play</button>
        <button onClick={() => audioRef.current.pause()}>Pause</button>
        <button onClick={() => nextSong(song)}>Next</button>
      </div>
      <p>{currentTime} / {duration}</p>
    </section>
  );
};

export default SongPlayer;
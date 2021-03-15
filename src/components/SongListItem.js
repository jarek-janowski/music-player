
const SongListItem =({ song, isCurrent, onSelect, setIsPaused, audioRef}) =>{
  const background = isCurrent ? "lightgreen" : "none";
  const style = { background };
 
  const handlePlayPause = () =>{
    audioRef.current.play();
    setIsPaused(false)
    onSelect(song);
  }

  return (
    <li style={style}>
      <button onClick={handlePlayPause}>Play</button>
      {song.artist.name} - {song.title}
    </li>
  );
}

export default SongListItem

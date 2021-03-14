const SongListItem =({ song, isCurrent, onSelect, audioRef }) =>{
  const background = isCurrent ? "lightgreen" : "none";
  const style = { background };

  const handlePlayOnClick = () => {
    onSelect(song);
    audioRef.current.play()
  };
  const handllePauseOnClick = () => {
    onSelect(song);
    audioRef.current.pause()
  }
  
  return (
    <li style={style}>
      <button onClick={handlePlayOnClick}>Play</button>
      <button onClick={handllePauseOnClick}>Pause</button>
      {song.artist.name} - {song.title}
    </li>
  );
}

export default SongListItem

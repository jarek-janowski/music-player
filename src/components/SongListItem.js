const SongListItem =({ song, isCurrent, onSelect }) =>{
  const background = isCurrent ? "lightgreen" : "none";
  const style = { background };
  const handleClick = () => {
    onSelect(song);
  };
  return (
    <li style={style} onClick={handleClick}>
      {song.artist.name} - {song.title}
    </li>
  );
}

export default SongListItem

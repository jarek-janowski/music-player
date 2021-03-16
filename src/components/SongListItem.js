import './SongListItem.scss'
const SongListItem =({ song, isCurrent, onSelect, setIsPaused, audioRef}) =>{
  const color = isCurrent ? "#009FFD" : "#EAF6FF";
  const style = { color };
  const {album, title, artist} = song
  const handlePlayPause = () =>{
    audioRef.current.play();
    setIsPaused(false)
    onSelect(song);
  }
  
  return (
    <li onClick={handlePlayPause} className="song-list-item">
      {/* <button className="song-list-item__button" onClick={handlePlayPause}>{playIcon}</button> */}
      <img className="song-list-item__image"src={album.cover_small} alt={`${title} cover`}/>
      <div className="title-artist-wrapper">
        <p className="song-list-item__title"style={style}>{title}</p>
        <p className="song-list-item__artist">{artist.name}</p>
      </div>
    </li>
  );
}

export default SongListItem

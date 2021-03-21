import './SongListItem.scss'
const SongListItem =({ 
  song, 
  isCurrent, 
  onSelect, 
  setIsPaused, 
  audioRef,
  addToFavourites,
 
}) =>{

  const color = isCurrent ? "#009FFD" : "#EAF6FF";
  const style = { color };
  const { album, title, artist } = song
  
  const handlePlayPause = () =>{
    audioRef.current.play();
    setIsPaused(false)
    onSelect(song);
  }

  return (
    <>
    <li className="song-list-item">
      <div onClick={handlePlayPause}>
        <img className="song-list-item__image"src={album.cover_small} alt={`${title} cover`}/>
        <div className="title-artist-wrapper">
          <p className="song-list-item__title"style={style}>{title}</p>
          <p className="song-list-item__artist">{artist.name}</p>
        </div>
        </div>
      <button onClick={() => addToFavourites(song)}>fav</button>
    </li>
    </>
  );
}

export default SongListItem

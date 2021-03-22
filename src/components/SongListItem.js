import './SongListItem.scss'
const SongListItem =({ 
  song, 
  isCurrent, 
  onSelect, 
  setIsPaused, 
  audioRef,
  addToFavourites,
  favourites
}) =>{

  const color = isCurrent ? "#009FFD" : "#EAF6FF";
  const style = { color };
  const { album, title, artist } = song
  
  const handlePlayPause = () =>{
    audioRef.current.play();
    setIsPaused(false)
    onSelect(song);
  }

  const favouritesMap = favourites.map(item => item.id)
  const includes = favouritesMap.includes(song.id)

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
      <button onClick={() => addToFavourites(song)}>{includes ? "❤" : "🤍"}</button>
    </li>
    </>
  );
}

export default SongListItem

import './SongListItem.scss'
const SongListItem =({ 
  song, 
  isCurrent, 
  onSelect, 
  setIsPaused, 
  audioRef,
  addToFavourites,
  currentPlaylist
}) =>{

  const color = isCurrent ? "#009FFD" : "#EAF6FF";
  const style = { color };
  const { album, title, artist } = song

  const currentPlaylistAll = currentPlaylist === "all"

  const handlePlayPause = () =>{
    audioRef.current.play();
    setIsPaused(false)
    onSelect(song);
  }
  
  const storageSongs = (JSON.parse(localStorage.getItem('favourites')) || []).map(item => (
    item.id))
  const includes = storageSongs.includes(song.id)

  const deleteIcon = <i className="fa fa-trash-o" aria-hidden="true"></i>
  const emptyHeart = <i className="fa fa-heart-o" aria-hidden="true"></i>
  const filledHeart = <i className="fa fa-heart" aria-hidden="true"></i>

  return (
    <>
    <li className="song-list-item">
      <div onClick={handlePlayPause} >
      <img className="song-list-item__image"src={album.cover_small} alt={`${title} cover`}/>
      <div className="title-artist-wrapper">
        <p className="song-list-item__title"style={style}>{title}</p>
        <p className="song-list-item__artist">{artist.name}</p>
      </div>
      </div>
      <button className="song-list-item__icon" onClick={() => addToFavourites(song)}>{currentPlaylistAll ? (includes ? filledHeart : emptyHeart) : deleteIcon}</button>
    </li>
    
    </>
  );
}

export default SongListItem

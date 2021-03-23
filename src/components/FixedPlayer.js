import './FixedPlayer.scss'

const FixedPlayer = ({
    handlePlayPause, 
    isPaused,
    progressRef,
    progress,
    song,
    className,
    addRemoveFromFavourites,
    playFavourites,
    playAll,
    currentPlaylist
}) => {
    const { album, title, artist } = song

    // const colorAll = currentPlaylist === "all" ? "#009FFD" : "#EAF6FF";
    // const colorFavourites = currentPlaylist === "favourites" ? "#009FFD" : "#EAF6FF";
    // const styleAll = { colorAll };
    // const styleFavourites = {colorFavourites}
    
    const pauseIcon = <i className="fa fa-pause" aria-hidden="true"></i>
    const playIcon = <i className="fa fa-play" aria-hidden="true"></i>
    const emptyHeart = <i className="fa fa-heart-o" aria-hidden="true"></i>
    const filledHeart = <i className="fa fa-heart" aria-hidden="true"></i>

    
    const currentPlaylistFavourites = currentPlaylist === "favourites"
    const currentPlaylistAll = currentPlaylist === "all"
    const favourites = currentPlaylistFavourites ? "playlists__chosen" : "playlists__no-chosen"
    const all = currentPlaylistAll ? "playlists__chosen" : "playlists__no-chosen"

    const storageSongs = (JSON.parse(localStorage.getItem('favourites')) || []).map
    (item => (item.id))
    const includes = storageSongs.includes(song.id)
    return (
        <>
        <div className={`fixed-player ${className}`}>
            <div onClick={() => window.scrollTo(0, 0)}>
                <div ref={progressRef} className="fixed-player__progress-container" >
                    <div style={{width: (progress * 100) + '%'}}></div>
                </div>
                <img className="fixed-player__image" src={album.cover_medium} alt={`${title} cover`}/>
                <div className="fixed-player__info">
                <h3 className="fixed-player__title">{title}</h3>
                <p className="fixed-player__artist">{artist.name}</p>
                </div>
            </div>
            <button className="fixed-player__heart"onClick={addRemoveFromFavourites}>{includes ? filledHeart : emptyHeart}</button>
            <button className="fixed-player__button" onClick={handlePlayPause}>{isPaused ? playIcon : pauseIcon}</button>
            <div className="playlists">
                <button className={all} onClick={playAll}>All songs <span>{currentPlaylistAll ? "" : playIcon}</span></button>
                <button className={favourites} onClick={playFavourites}>Favourites <span>{currentPlaylistFavourites ? "" : playIcon}</span></button>
            </div>
        </div>
        </>
    );
}
 
export default FixedPlayer;

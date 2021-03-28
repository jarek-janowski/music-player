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
    currentPlaylist,
    data,
    favourites,
    popOut,
}) => {
    const { cover, title, artist } = song

    const pauseIcon = <i className="fa fa-pause" aria-hidden="true"></i>
    const playIcon = <i className="fa fa-play" aria-hidden="true"></i>
    const emptyHeart = <i className="fa fa-heart-o" aria-hidden="true"></i>
    const filledHeart = <i className="fa fa-heart" aria-hidden="true"></i>

    const currentPlaylistFavourites = currentPlaylist === "favourites"
    const currentPlaylistAll = currentPlaylist === "all"
    const favouritesClass = currentPlaylistFavourites ? "playlists__chosen" : "playlists__no-chosen"
    const allClass = currentPlaylistAll ? "playlists__chosen" : "playlists__no-chosen"

    const storageSongs = (JSON.parse(localStorage.getItem('favourites')) || []).map(item => (
        item.id))
    const includes = storageSongs.includes(song.id)
    
    return (
        <>
        <div className={`fixed-player ${className}`}>
            <div >
                <div ref={progressRef} className="fixed-player__progress-container" >
                    <div style={{width: (progress * 100) + '%'}}></div>
                </div>
                <img onClick={() => window.scrollTo(0, 0)} className="fixed-player__image" src={cover} alt={`${title} cover`}/>
                <div onClick={() => window.scrollTo(0, 0)} className="fixed-player__info">
                    <h3 className="fixed-player__title">{title}</h3>
                    <p className="fixed-player__artist">{artist}</p>
                </div>
            </div>
                <button className="fixed-player__heart"onClick={addRemoveFromFavourites}>{includes ? filledHeart : emptyHeart}</button>
                <button className="fixed-player__button" onClick={handlePlayPause}>{isPaused ? playIcon : pauseIcon}</button>
           
        </div>
        <div className="playlists">
            <button className={allClass} onClick={playAll}>All songs {`(${data.length})`}<span>{currentPlaylistAll ? "" : playIcon}</span></button>
            <button className={favouritesClass} onClick={playFavourites}>Favourites {`(${favourites === null ? "0" :favourites.length})`}<span>{currentPlaylistFavourites ? "" : playIcon}</span></button>
        </div>
        {popOut ? <div className="pop-out">Favourites is empty</div> : ""}
        </>
    );
}
 
export default FixedPlayer;

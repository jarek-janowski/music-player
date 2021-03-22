import './FixedPlayer.scss'

const FixedPlayer = ({
    handlePlayPause, 
    isPaused,
    progressRef,
    progress,
    song,
    className,
    addRemoveFromFavourites,
    favourites
}) => {
    const { album, title, artist } = song

    
    const pauseIcon = <i className="fa fa-pause" aria-hidden="true"></i>
    const playIcon = <i className="fa fa-play" aria-hidden="true"></i>
    const emptyHeart = <i className="fa fa-heart-o" aria-hidden="true"></i>
    const filledHeart = <i className="fa fa-heart" aria-hidden="true"></i>

    const storageSongs = (JSON.parse(localStorage.getItem('favourites')) || []).map
    (item => (item.id))
    const includes = storageSongs.includes(song.id)
    return (
        <div className={`fixed-player ${className}`}>
            <div onClick={() => window.scrollTo(0, 0)}>
                <div ref={progressRef} className="fixed-player__progress-container" >
                    <div style={{width: (progress * 100) + '%'}}></div>
                </div>
                <img className="fixed-player__image" src={album.cover_small} alt={`${title} cover`}/>
                <div className="fixed-player__info">
                <h3 className="fixed-player__title">{title}</h3>
                <p className="fixed-player__artist">{artist.name}</p>
                </div>
            </div>
            <button className="fixed-player__heart"onClick={addRemoveFromFavourites}>{includes ? filledHeart : emptyHeart}</button>
            <button className="fixed-player__button" onClick={handlePlayPause}>{isPaused ? playIcon : pauseIcon}</button>
        </div>
        
    );
}
 
export default FixedPlayer;

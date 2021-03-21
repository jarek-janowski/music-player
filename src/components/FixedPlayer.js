import './FixedPlayer.scss'

const FixedPlayer = ({
    handlePlayPause, 
    isPaused,
    progressRef,
    progress,
    song,
    className,
    addRemoveFromFavourites,
    
}) => {
    const { album, title, artist } = song
    const pauseIcon = <i className="fa fa-pause" aria-hidden="true"></i>
    const playIcon = <i className="fa fa-play" aria-hidden="true"></i>
    return (
        <div className={`fixed-player ${className}`}>
            <div ref={progressRef} className="fixed-player__progress-container" >
                <div style={{width: (progress * 100) + '%'}}></div>
            </div>
            <img className="fixed-player__image" src={album.cover_small} alt={`${title} cover`}/>
            <div className="fixed-player__info">
              <h3 className="fixed-player__title">{title}</h3>
              <p className="fixed-player__artist">{artist.name}</p>
            </div>
            <button onClick={addRemoveFromFavourites}>fav</button>
            <button className="fixed-player__button" onClick={handlePlayPause}>{isPaused ? playIcon : pauseIcon}</button>
        </div>);
}
 
export default FixedPlayer;

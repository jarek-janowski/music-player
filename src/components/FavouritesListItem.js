
const FavouritesListItem  = ({artist, cover, title}) => {
    return ( 
      <li className="song-list-item">
        <div>
          <img className="song-list-item__image"src={cover} alt={`${title} cover`}/>
          <div className="title-artist-wrapper">
            <p className="song-list-item__title" >{title}</p>
            <p className="song-list-item__artist">{artist}</p>
          </div>
        </div>
      </li>
     );
  }

  export default FavouritesListItem

const FavouritesListItem  = ({favitem, removeFromFavourites}) => {
    const {artist, cover, title} = favitem

    const deleteIcon = <i className="fa fa-trash-o" aria-hidden="true"></i>
    return ( 
      <li className="song-list-item">
        <div>
          <img className="song-list-item__image"src={cover} alt={`${title} cover`}/>
          <div className="title-artist-wrapper">
            <p className="song-list-item__title" >{title}</p>
            <p className="song-list-item__artist">{artist}</p>
          </div>
          <button className="song-list-item__icon" onClick={() => removeFromFavourites(favitem)}>{deleteIcon}</button>
        </div>
      </li>
     );
  }

  export default FavouritesListItem
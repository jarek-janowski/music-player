import FavouritesListItem from './FavouritesListItem'

const Favourites = ({favourites, removeFromFavourites, playFavourites, playAll }) => {
  const storageSongs = (JSON.parse(localStorage.getItem('favourites'))) || [];

    return ( 
      <section style={{paddingBottom: 96}}>
          <h2 className="songs__heading">Favourites</h2>
          <button onClick={playFavourites}>play fav</button>
          <button onClick={playAll}>play all</button>
          <ul className="songs__list">
            {storageSongs.length === 0 ? "Dodaj coś" :favourites.map(favitem =>(
              <FavouritesListItem
                favitem={favitem}
                key={favitem.id} 
                removeFromFavourites={removeFromFavourites}
              />
            ))}
          </ul>
        </section>
     );
  }

  export default Favourites
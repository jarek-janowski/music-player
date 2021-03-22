import FavouritesListItem from './FavouritesListItem'

const Favourites = ({favourites, removeFromFavourites}) => {
  const storageSongs = (JSON.parse(localStorage.getItem('favourites'))) || [];

    return ( 
      <section style={{paddingBottom: 96}}>
          <h2 className="songs__heading">Favourites</h2>
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
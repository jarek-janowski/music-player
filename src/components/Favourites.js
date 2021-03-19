import FavouritesListItem from './FavouritesListItem'

const Favourites = ({favourites}) => {
    return ( 
      <section style={{paddingBottom: 96}}>
          <h2 className="songs__heading">Favourites</h2>
          <ul className="songs__list">
            {favourites=== null ? "Dodaj coś" :favourites.map(favitem =>(
              <FavouritesListItem
                key={favitem.id} 
                artist={favitem.artist}
                cover={favitem.cover}
                id={favitem.id}
                preview={favitem.preview}
                title={favitem.title}
              />
            ))}
          </ul>
        </section>
     );
  }

  export default Favourites
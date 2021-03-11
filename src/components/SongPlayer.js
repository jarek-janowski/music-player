import { useRef } from 'react';

const SongPlayer = ({ song, nextSong, prevSong }) => {
  const audioRef = useRef();
  const { preview, album, title } = song;

  return (
    <section>
      <h1>Music player</h1>
      <img
        width="250px"
        height="250px"
        src={album.cover_medium}
        alt={`${title} cover`} />
      <audio ref={audioRef} key={album.cover_medium} controls>
        <source src={preview} />
      </audio>
      <div>
        <button onClick={() => prevSong(song)}>Prev</button>
        <button onClick={() => audioRef.current.play()}>Play</button>
        <button onClick={() => audioRef.current.pause()}>Pause</button>
        <button onClick={() => nextSong(song)}>Next</button>
      </div>
    </section>
  );
};

export default SongPlayer;
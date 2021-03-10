import { useRef } from 'react';

const SongPlayer = ({ song }) => {
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
        <button onClick={() => audioRef.current.play()}>Play</button>
        <button onClick={() => audioRef.current.pause()}>Pause</button>
      </div>
    </section>
  );
};

export default SongPlayer;
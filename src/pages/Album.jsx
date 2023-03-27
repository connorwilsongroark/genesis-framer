import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { ImPlay3 } from "react-icons/im";
import { RxCaretLeft } from "react-icons/rx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Album = ({ musicData }) => {
  const albumVariants = {
    hidden: {
      x: "100vw",
    },
    visible: {
      x: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.4,
      },
    },
    exit: {
      x: "100vw",
      transition: {
        ease: "easeInOut",
        duration: 0.4,
      },
    },
  };

  const { id } = useParams();
  const selectedAlbum = musicData[id];
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);
  const audioElem = useRef();
  const [selectedTrack, setSelectedTrack] = useState(0);

  const handleTrackClick = (track) => {
    setSelectedTrack(track);
    if (
      selectedTrack.trackId === track.trackId &&
      audioElem.current.currentTime > 0
    ) {
      setTimeout(() => {
        audioElem.current.pause();
        audioElem.current.currentTime = 0;
        setAudioIsPlaying(false);
      }, 50);
    } else {
      setTimeout(() => {
        audioElem.current.play();
        setAudioIsPlaying(true);
      }, 50);
    }
  };

  const trackArray = selectedAlbum?.tracks.map((track, i) => {
    return (
      <motion.li
        key={track.trackId}
        className='track-card'
        whileHover={{
          scale: 1.02,
        }}
        onClick={() => handleTrackClick(track)}
      >
        <div className='track-card__content'>
          <p>{track.trackName}</p>
          <div className='play-stop-icon'>
            {selectedTrack.trackId === track.trackId && audioIsPlaying ? (
              <div className='box'></div>
            ) : (
              <ImPlay3 />
            )}
          </div>
        </div>
      </motion.li>
    );
  });

  return (
    <motion.div
      variants={albumVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='album'
      // onLoad={() => window.scrollTo(0, 0)}
    >
      {selectedAlbum ? (
        <>
          {/* back arrow */}

          {/* player */}
          <div className='audio-player'>
            <div>
              <Link to={`/`} className='router-link'>
                <motion.div
                  whileHover={{
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                  className='home-link'
                >
                  <RxCaretLeft />
                </motion.div>
              </Link>
            </div>
            {/* Hidden player */}
            <div className='cover-record-container'>
              <img
                src={selectedAlbum.cover}
                className='audio-player__cover'
                alt=''
              />
              <img
                src='images/record.png'
                className={`spinning-album ${
                  audioIsPlaying ? `is-spinning` : ``
                }`}
                alt=''
              />
            </div>
            <audio
              src={selectedTrack.trackAudio}
              ref={audioElem}
              onEnded={() => setAudioIsPlaying(false)}
            ></audio>
          </div>
          <h2>{selectedAlbum.name}</h2>
          <hr width='50px' />
          <p className='album__description'>{selectedAlbum.description}</p>
          <h2>Tracks</h2>
          <hr width='50px' />
          <ul className='track-cards-container'>{trackArray}</ul>
        </>
      ) : (
        <>
          <div className='not-found'>
            <h1>No album found.</h1>
            <p>
              Return to{" "}
              <Link to='/' className='router-link'>
                <span>Home</span>
              </Link>
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Album;

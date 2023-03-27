import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = ({ musicData }) => {
  const homeVariants = {
    hidden: {
      x: "-100vw",
    },
    visible: {
      x: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.4,
      },
    },
    exit: {
      x: "-100vw",
      transition: {
        ease: "easeInOut",
        duration: 0.4,
      },
    },
  };

  const albumArray = musicData.map((album, i) => (
    <motion.li
      key={album.albumId}
      whileHover={{
        scale: 1.02,
      }}
    >
      <Link to={`/${album.albumId}`} className='router-link album-card'>
        <img src={album.cover} alt='' />
        <div className='album-text'>
          <p className='album-text__title'>{album.name}</p>
          <p>{album.releaseYear}</p>
        </div>
      </Link>
    </motion.li>
  ));
  return (
    // Genesis - the first 10 years
    <motion.div
      variants={homeVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='home'
    >
      <img
        src='images/genesis-logo.png'
        className='logo'
        alt='genesis band logo'
      />

      <h2>The Early Years</h2>
      <hr width='50px'></hr>
      <p className='home__description'>
        <span className='bold'>Genesis</span> is an English rock band formed at
        Charterhouse School, Godalming, Surrey, in 1967. In the 1970s, during
        which the band also included singer Peter Gabriel and guitarist Steve
        Hackett, <span className='bold'>Genesis</span> was among the pioneers of
        progressive rock.
      </p>
      <h2>Albums</h2>
      <hr width='50px'></hr>
      <ul className='album-cards-container'>{albumArray}</ul>
    </motion.div>
  );
};

export default Home;

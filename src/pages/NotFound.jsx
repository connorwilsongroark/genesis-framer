import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='not-found'>
      <h1>No album found.</h1>
      <p>
        Return to{" "}
        <Link to='/' className='router-link'>
          <span>Home</span>
        </Link>
      </p>
    </div>
  );
};

export default NotFound;

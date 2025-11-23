import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <img
          src="../page404.avif"
          alt="404 Not Found"
          className="notfound-img"
        />
        <p className="notfound-text">
          Oops! The page you're looking for doesn't exist.
        </p>

        <a href="/" className="notfound-btn">
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;

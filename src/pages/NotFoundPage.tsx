import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <div className="text-danger fw-bold fs-1">404 Not Found</div>
      <Link to={"/Motivational-Quotes-Generator/"}>
        <button type="button" className="btn btn-primary m-3">
          Back to Homepage
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;

import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Link to="/Motivational-Quotes-Generator/login">
      <button type="button" className="btn btn-secondary">
        Login
      </button>
    </Link>
  );
};

export default LoginButton;

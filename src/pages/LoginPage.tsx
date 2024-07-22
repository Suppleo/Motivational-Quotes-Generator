import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <div className="d-flex justify-content-center">
          <Link to={"/Motivational-Quotes-Generator/"}>
            <button
              type="button"
              className="btn btn-link m-3 justify-content-center"
            >
              Back to Homepage
            </button>
          </Link>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center">
              Login to Motivational Quotes Generator!
            </h5>
            <form>
              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  placeholder="Enter password"
                />
              </div>
            </form>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success">
                Log in
              </button>
            </div>
            <br />
            <div className="fw-bold text-center">
              Don't have an account? Sign up with:
            </div>
            <div className="d-flex justify-content-center">
              <Link
                to={"/Motivational-Quotes-Generator/signup"}
                style={{ textDecoration: "none" }}
              >
                <button
                  type="submit"
                  className="btn btn-secondary m-2 d-flex align-items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-envelope-fill"
                    viewBox="0 0 16 16"
                    style={{ verticalAlign: "middle" }} // Add this line to vertically align the SVG
                  >
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                  </svg>
                  <span className="ms-2">Email</span>
                </button>
              </Link>
              <button type="submit" className="btn btn-primary m-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                  style={{ verticalAlign: "-2px" }}
                >
                  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                </svg>
                <span className="ms-2">Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

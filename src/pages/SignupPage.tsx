import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useState } from "react";

function SignUpPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleCloseError = () => {
    setAlertVisible(false);
  };

  const handleSignUp = async () => {
    if (registerPassword !== confirmPassword) {
      setErrorMessage("Password and confirm password do not match");
      setAlertVisible(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const user = userCredential.user;

      // Save additional user information to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        username,
        email: registerEmail,
      });

      console.log(user);
      setIsSignedUp(true);
    } catch (error: Error | any) {
      console.error(error);
      if (error.code === "auth/weak-password") {
        setErrorMessage("Password should be at least 6 characters");
      } else if (error.code === "auth/email-already-in-use") {
        setErrorMessage("This email is already in use");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("The email address is invalid");
      } else {
        setErrorMessage(error.message);
      }
      setAlertVisible(true);
    }
  };

  if (isSignedUp) {
    navigate(`/Motivational-Quotes-Generator/`);
    return;
  }

  return (
    <>
      {alertVisible && (
        <div
          className={`alert alert-danger alert-dismissible fade show`}
          role="alert"
        >
          {errorMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={handleCloseError}
          ></button>
        </div>
      )}
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
                Sign up for Motivational Quotes Generator!
              </h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="fullNameInput" className="form-label">
                    Full name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullNameInput"
                    placeholder="e.g. Gumball Waterson"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="usernameInput" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="usernameInput"
                    placeholder="e.g. gumball_iz_kool123"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    placeholder="example@domain.com"
                    onChange={(e) => setRegisterEmail(e.target.value)}
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
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPasswordInput" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPasswordInput"
                    placeholder="Confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </form>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={handleSignUp}
                >
                  Sign up
                </button>
              </div>
              <br />
              <div className="fw-bold text-center">
                Already have an account?{" "}
                <span>
                  <Link to={"/Motivational-Quotes-Generator/login"}>
                    Log in
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;

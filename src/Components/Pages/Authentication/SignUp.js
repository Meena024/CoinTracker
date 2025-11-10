import form_classes from "../../UI/CSS/Form.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../../UI/Card/Card";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    setError(null);
    if (password === confirmPassword) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdGYjLFC5DIrMp-l1ZEpgi-d1ntGdDqt0`,
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message || "Signup failed!");
        }

        console.log("Sign Up Successfull! data:", data);

        //Verify email id

        const verify_response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAdGYjLFC5DIrMp-l1ZEpgi-d1ntGdDqt0`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              requestType: "VERIFY_EMAIL",
              idToken: data.idToken,
            }),
          }
        );

        const verify_email = await verify_response.json();

        if (!verify_response.ok) {
          throw new Error(
            verify_email.error.message || "Failed to send verification email!"
          );
        }

        alert("Verification email sent successfully!");

        navigate("/");
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Passwords doesn't match");
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLoading(false);
  };

  return (
    <div className={form_classes.authFormCenter}>
      <Card>
        <h1>Sign Up</h1>
        <form onSubmit={signupHandler} className={form_classes.form}>
          <div style={{ margin: "20px" }}>
            <input
              id="email"
              type="email"
              placeholder="E-Mail id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div style={{ margin: "20px" }}>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <div style={{ margin: "20px" }}>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <div className="text-danger text-center m-2">{error}</div>}

          <div style={{ margin: "5px" }}>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Sign Up"}
            </button>
          </div>
        </form>
        <div style={{ marginTop: "8px" }}>
          <button
            type="button"
            className="btn btn-link p-0 text-dark"
            onClick={() => navigate("/")}
          >
            Already having an Account?<div>SIGN IN</div>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;

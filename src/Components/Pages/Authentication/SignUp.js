import form_classes from "../../UI/Form.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
        console.log("data", data);
        console.log("response", response);
        if (!response.ok) {
          throw new Error(data.error.message || "Signup failed!");
        }
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
    <>
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
    </>
  );
};

export default SignUp;

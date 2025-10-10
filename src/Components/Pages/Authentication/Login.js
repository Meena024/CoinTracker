import { useState } from "react";
import form_classes from "../../UI/Form.module.css";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdGYjLFC5DIrMp-l1ZEpgi-d1ntGdDqt0`,
        {
          method: "POST",
          body: JSON.stringify({ email, password, returnSecureToken: true }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Login failed!");
      }

      localStorage.setItem("token", data.idToken);
      localStorage.setItem("userId", data.localId);

      navigate("/welcome");
    } catch (err) {
      setError(err.message);
    }
    setEmail("");
    setPassword("");
    setLoading(false);
  };
  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={loginHandler} className={form_classes.form}>
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

        {error && <div className="text-danger text-center mt-2">{error}</div>}

        <div style={{ margin: "5px" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </div>
      </form>

      <div style={{ marginTop: "8px" }}>
        <button
          type="button"
          className="btn btn-link p-0 text-dark"
          onClick={() => navigate("/ForgotPassword")}
        >
          Forgot Password?
        </button>
      </div>
      <div style={{ marginTop: "8px" }}>
        <button
          type="button"
          className="btn btn-link p-0 text-dark"
          onClick={() => navigate("/SignUp")}
        >
          Create a new Account?
          <div>SIGN UP</div>
        </button>
      </div>
    </>
  );
};

export default Login;

import { useState } from "react";
import form_classes from "../../UI/Form.module.css";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const login_details = {
      email,
      password,
    };
    console.log(login_details);
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
    </>
  );
};

export default Login;

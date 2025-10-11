import { useState } from "react";
import form_classes from "../../UI/Form.module.css";
import { useNavigate } from "react-router";
import Card from "../../UI/Card";
import { AuthAction } from "../../Redux store/AuthSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getValidIdToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return null;

    const res = await fetch(
      "https://securetoken.googleapis.com/v1/token?key=AIzaSyAdGYjLFC5DIrMp-l1ZEpgi-d1ntGdDqt0",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      }
    );
    const data = await res.json();

    if (!res.ok) throw new Error(data.error?.message || "Token refresh failed");

    localStorage.setItem("token", data.id_token);
    localStorage.setItem("refreshToken", data.refresh_token);
    localStorage.setItem("tokenExpiry", Date.now() + data.expires_in * 1000);

    dispatch(AuthAction.setIdToken(data.idToken));

    return data.id_token;
  }

  function scheduleTokenRefresh() {
    const expiry = parseInt(localStorage.getItem("tokenExpiry"), 10);
    const timeout = expiry - Date.now() - 30000; // 30s before expiry

    if (timeout > 0) {
      setTimeout(async () => {
        await getValidIdToken();
        scheduleTokenRefresh();
      }, timeout);
    }
  }

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
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("tokenExpiry", Date.now() + data.expiresIn * 1000);

      dispatch(AuthAction.userAuthenticated());
      dispatch(AuthAction.setIdToken(data.idToken));
      dispatch(AuthAction.setUserId(data.localId));

      scheduleTokenRefresh();
      navigate("/welcome");
    } catch (err) {
      setError(err.message);
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // centers horizontally
        alignItems: "center", // centers vertically
        height: "70vh", // full viewport height
      }}
    >
      <Card>
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
      </Card>
    </div>
  );
};

export default Login;

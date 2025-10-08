import { useState } from "react";
import { useNavigate } from "react-router";
import form_classes from "../../UI/Form.module.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    console.log(email);
    setLoading(false);
  };
  return (
    <>
      <h1>Forgot Password</h1>
      <form onSubmit={resetPasswordHandler} className={form_classes.form}>
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

        {error && <div className="text-danger text-center mt-2">{error}</div>}

        <div style={{ margin: "5px" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Reset Password"}
          </button>
        </div>
      </form>

      {message && <p className="text-success mt-3 text-center">{message}</p>}
      {error && <p className="text-danger mt-3 text-center">{error}</p>}

      <div style={{ marginTop: "8px" }}>
        <button
          type="button"
          className="btn btn-link p-0 text-dark"
          onClick={() => navigate("/")}
        >
          Go back to Sign In?
        </button>
      </div>
    </>
  );
};

export default ForgotPassword;

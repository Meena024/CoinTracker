import { useState } from "react";
import { useNavigate } from "react-router";
import form_classes from "../../UI/Form.module.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAdGYjLFC5DIrMp-l1ZEpgi-d1ntGdDqt0`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email,
          }),
        }
      );

      const data = await response.json();
      console.log(data, response);

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to send reset email!");
      }

      setMessage("Password reset link has been sent!");
      setEmail("");
    } catch (err) {
      setError(err.message);
    }
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

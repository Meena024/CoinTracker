import { useState } from "react";
import Card from "../UI/Card";
import form_classes from "../UI/Form.module.css";
import { ModalActions } from "../Redux store/ModalSlice";
import { useDispatch } from "react-redux";
import { ProfileActiions } from "../Redux store/ProfileSlice";

const EditProfile = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAdGYjLFC5DIrMp-l1ZEpgi-d1ntGdDqt0`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken: token,
            displayName: name,
            photoUrl: pictureUrl,
            returnSecureToken: true,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) throw new Error(data.error.message || "Update failed");

      dispatch(ProfileActiions.setName(name));
      dispatch(ProfileActiions.setProfileUrl(pictureUrl));
      dispatch(ModalActions.unsetModal());
      console.log("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Card>
      <h1>Your Profile</h1>
      <form onSubmit={updateProfileHandler} className={form_classes.form}>
        <div style={{ margin: "20px" }}>
          <input
            id="name"
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </div>

        <div style={{ margin: "20px" }}>
          <input
            id="pictureUrl"
            type="pictureUrl"
            placeholder="Profile Picture URL"
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
            autoComplete="url"
            required
          />
        </div>

        {error && <div className="text-danger text-center mt-2">{error}</div>}

        <div
          style={{
            margin: "5%",
            display: "flex",
            justifyContent: "center",
            gap: "2px",
          }}
        >
          <button
            type="button"
            onClick={() => dispatch(ModalActions.unsetModal())}
          >
            Cancel
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default EditProfile;

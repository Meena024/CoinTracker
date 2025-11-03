import { useRef, useEffect, useState } from "react";
import Card from "../../../UI/Card/Card";
import form_classes from "../../../UI/CSS/Form.module.css";
import { ModalActions } from "../../../../Redux store/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { ProfileActions } from "../../../../Redux store/ProfileSlice";

const EditProfile = () => {
  const dispatch = useDispatch();

  const storedName = useSelector((state) => state.profile.name);
  const storedPictureUrl = useSelector((state) => state.profile.profileUrl);

  const nameRef = useRef();
  const pictureUrlRef = useRef();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (nameRef.current) nameRef.current.value = storedName || "";
    if (pictureUrlRef.current)
      pictureUrlRef.current.value = storedPictureUrl || "";
  }, [storedName, storedPictureUrl]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const enteredName = nameRef.current.value.trim();
    const enteredPictureUrl = pictureUrlRef.current.value.trim();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAdGYjLFC5DIrMp-l1ZEpgi-d1ntGdDqt0`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken: token,
            displayName: enteredName,
            photoUrl: enteredPictureUrl,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();
      console.log("Update response:", data);

      if (!response.ok) throw new Error(data.error?.message || "Update failed");

      dispatch(ProfileActions.setName(enteredName));
      dispatch(ProfileActions.setProfileUrl(enteredPictureUrl));

      dispatch(ModalActions.unsetModal());
      console.log("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h1>Your Profile</h1>
      <form onSubmit={updateProfileHandler} className={form_classes.form}>
        <div style={{ margin: "20px" }}>
          <input
            id="name"
            type="text"
            placeholder="Name"
            ref={nameRef}
            autoComplete="name"
            required
          />
        </div>

        <div style={{ margin: "20px" }}>
          <input
            id="pictureUrl"
            type="text"
            placeholder="Profile Picture URL"
            ref={pictureUrlRef}
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

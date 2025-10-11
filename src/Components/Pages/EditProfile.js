import { useState } from "react";
import Card from "../UI/Card";
import form_classes from "../UI/Form.module.css";
import { ModalActions } from "../Redux store/ModalSlice";
import { useDispatch } from "react-redux";

const EditProfile = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateProfileHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("profile updation");
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

import edit_icon from "../../../Assets/Edit_icon1.png";
import head_classes from "../../UI/Head.module.css";
import { useNavigate } from "react-router-dom";
import { AuthAction } from "../../Redux store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { ModalActions } from "../../Redux store/ModalSlice";

const Head = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useSelector((state) => state.profile.name);
  const pictureUrl = useSelector((state) => state.profile.profileUrl);

  const logoutHandler = async () => {
    try {
      console.log("logging out!");

      localStorage.removeItem("token");
      dispatch(AuthAction.userLogOut());

      navigate("/");
      console.log("logged out successfully");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const editHandler = () => {
    console.log("edit button clicked!");
    dispatch(ModalActions.setModalContent("EditProfile"));
    dispatch(ModalActions.setModal());
  };

  return (
    <div className={head_classes.head_light}>
      <div className={head_classes.head_content}>
        <span className="d-flex justifyContent gap-5">
          <span>
            <img
              src={pictureUrl}
              alt="..."
              height={60}
              width={60}
              className="rounded"
            />
          </span>
          <span>
            <h4>Hello {name},</h4>
            <h6>When you track it, You control it.</h6>
          </span>
          <span>
            <button className="p-2" onClick={editHandler}>
              <img src={edit_icon} alt="Edit Profile" height={30} />
            </button>
          </span>
        </span>
        <span>
          <button onClick={logoutHandler}>Logout</button>
        </span>
      </div>
    </div>
  );
};

export default Head;

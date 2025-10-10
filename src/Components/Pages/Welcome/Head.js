import edit_icon from "../../../Assets/Edit_icon1.png";
import head_classes from "../../UI/Head.module.css";
import { useNavigate } from "react-router-dom";

const Head = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      console.log("logging out!");

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("userId");

      navigate("/");
      console.log("logged out successfully");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const editHandler = () => {
    console.log("edit button clicked!");
  };

  return (
    <div className={head_classes.head_light}>
      <div className={head_classes.head_content}>
        <span className="d-flex justifyContent gap-5">
          <span>
            <img
              src="https://media.istockphoto.com/id/629653980/photo/snowman.jpg?s=612x612&w=0&k=20&c=Mbsnibgwa0VuiwcJQLrzchvPqWnI9GIYVFdGPttx4eE="
              alt="..."
              height={60}
              width={60}
              className="rounded"
            />
          </span>
          <span>
            <h4>Hello,</h4>
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

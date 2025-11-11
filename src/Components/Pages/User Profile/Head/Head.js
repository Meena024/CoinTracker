import React, { useState, useEffect } from "react";
import edit_icon from "../../../../Assets/Edit_icon1.png";
import head_classes from "../../../UI/CSS/Head.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../../../../Redux store/AuthSlice";
import { ModalActions } from "../../../../Redux store/ModalSlice";
import { ExpenseActions } from "../../../../Redux store/ExpenseSlice";
import { MiscActions } from "../../../../Redux store/MiscSlice";
import { ProfileActions } from "../../../../Redux store/ProfileSlice";
const Head = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useSelector((state) => state.profile.name);
  const pictureUrl = useSelector((state) => state.profile.profileUrl);
  const filteredExpenses = useSelector(
    (state) => state.expense.filteredExpenses
  );

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const text = searchText.trim().toLowerCase();

      if (!text) {
        // Reset search to show all filteredExpenses
        dispatch(ExpenseActions.setSearchedExpenses(filteredExpenses));
        return;
      }

      const searchedExpenses = filteredExpenses.filter(
        (exp) =>
          exp.category.toLowerCase().includes(text) ||
          exp.description.toLowerCase().includes(text) ||
          exp.amount.toString().includes(text)
      );

      dispatch(ExpenseActions.setSearchedExpenses(searchedExpenses));
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchText, filteredExpenses, dispatch]);

  const logoutHandler = async () => {
    try {
      console.log("Logging out...");

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiry");

      dispatch(AuthAction.reset());
      dispatch(ExpenseActions.reset());
      dispatch(MiscActions.reset());
      dispatch(ProfileActions.reset());

      navigate("/");

      console.log("Logged out successfully");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const editHandler = () => {
    console.log("Edit button clicked!");
    dispatch(ModalActions.setModalContent("EditProfile"));
    dispatch(ModalActions.setModal());
  };

  return (
    <div className={head_classes.head_light}>
      <div className={head_classes.head_content}>
        <span className="d-flex justifyContent gap-5 align-items-center">
          {pictureUrl && (
            <img
              src={pictureUrl}
              alt="Profile"
              height={60}
              width={60}
              className="rounded"
            />
          )}

          <div className={head_classes.nowrap_text}>
            <h4>Hello {name || "User"},</h4>
            <h6>When you track it, you control it.</h6>
          </div>

          <button className="p-2" onClick={editHandler}>
            <img src={edit_icon} alt="Edit Profile" height={30} />
          </button>
        </span>

        <span className="position-relative gap-5 d-inline-block">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setSearchText("")}
            className="position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent fw-bold"
            style={{
              cursor: "pointer",
              fontSize: "1.2rem",
              lineHeight: "1",
              color: "black",
            }}
          >
            ×
          </button>
        </span>

        <span>
          <button onClick={logoutHandler}>Logout</button>
        </span>
      </div>
    </div>
  );
};

export default Head;

import React, { useState, useEffect } from "react";
import edit_icon from "../../../../Assets/Edit_icon1.png";
import head_classes from "../../../UI/Head.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../../../Redux store/AuthSlice";
import { ModalActions } from "../../../Redux store/ModalSlice";
import { ExpenseActions } from "../../../Redux store/ExpenseSlice";

const Head = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useSelector((state) => state.profile.name);
  const pictureUrl = useSelector((state) => state.profile.profileUrl);
  const filteredExpenses = useSelector(
    (state) => state.expense.filteredExpenses
  );

  const [searchText, setSearchText] = useState("");

  // 🔍 Debounced search handler
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
      dispatch(AuthAction.userLogOut());
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
          {/* Profile picture */}
          {pictureUrl && (
            <img
              src={pictureUrl}
              alt="Profile"
              height={60}
              width={60}
              className="rounded"
            />
          )}

          {/* Welcome message */}
          <span>
            <h4>Hello {name || "User"},</h4>
            <h6>When you track it, you control it.</h6>
          </span>

          {/* Edit profile button */}
          <button className="p-2" onClick={editHandler}>
            <img src={edit_icon} alt="Edit Profile" height={30} />
          </button>
        </span>

        {/* Search input */}
        <div className="position-relative d-inline-block">
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
        </div>

        {/* Logout button */}
        <button className="p-2 ms-3" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Head;

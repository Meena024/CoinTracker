import React, { useState, useEffect } from "react";
import edit_icon from "../../../../Assets/edit_icon.svg";
import chart_icon from "../../../../Assets/chart_icon.svg";
import download_icon from "../../../../Assets/download_icon.png";
import head_classes from "../../../UI/CSS/Head.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../../../../Redux store/AuthSlice";
import { ModalActions } from "../../../../Redux store/ModalSlice";
import { ExpenseActions } from "../../../../Redux store/ExpenseSlice";
import { MiscActions } from "../../../../Redux store/MiscSlice";
import { ProfileActions } from "../../../../Redux store/ProfileSlice";
import Switch from "@mui/material/Switch";
import {
  setDarkModeUpdate,
  setPremiumUpdate,
} from "../../../../Redux store/MiscActions";

const Head = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useSelector((state) => state.profile.name);
  const pictureUrl = useSelector((state) => state.profile.profileUrl);
  const isPremium = useSelector((state) => state.misc.premium);
  const mode = useSelector((state) => state.misc.darkMode);

  const searchedExpenses = useSelector(
    (state) => state.expense.searchedExpenses
  );
  const expenses = useSelector((state) => state.expense.expenses);
  const userId = useSelector((state) => state.auth.userId);

  const totalAmount = searchedExpenses.reduce(
    (acc, curr) =>
      curr.type === "Credit"
        ? acc + Number(curr.amount)
        : acc - Number(curr.amount),
    0
  );

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

  const chartHandler = () => {
    dispatch(ModalActions.setModalContent("Chart"));
    dispatch(ModalActions.setModal());
  };

  const downloadHandler = () => {
    const csvRows = [
      ["Filtered transactions"],
      ["Date", "Amount", "Category", "Custom", "Description", "Type"],
      ...searchedExpenses.map(
        ({ date, amount, category, cust_cat, description, type }) => [
          date,
          amount,
          category,
          cust_cat,
          description,
          type,
        ]
      ),
      [],
      ["Net Balance:", totalAmount],
    ];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const PremCheck = expenses.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );
  if (expenses.length && PremCheck < 10000) {
    console.log("PremCheck < 10000");
    dispatch(setPremiumUpdate(false, userId));
  }

  const zoomImageHandler = () => {
    dispatch(ModalActions.setModalContent("ZoomImage"));
    dispatch(ModalActions.setModal());
  };

  return (
    <div className={head_classes.head_light}>
      <div className={head_classes.head_content}>
        <span className="d-flex justifyContent gap-5 align-items-left">
          {pictureUrl && (
            <img
              src={pictureUrl}
              alt="Profile"
              height={50}
              width={50}
              className="rounded border white"
              onClick={() => zoomImageHandler()}
            />
          )}

          <div className={head_classes.nowrap_text}>
            <h4>Hello {name || "User"},</h4>
            <h6>When you track it, you control it.</h6>
          </div>

          <button
            className="p-1"
            style={{ backgroundColor: "rgb(253, 193, 81)" }}
            onClick={editHandler}
          >
            <img src={edit_icon} alt="Edit Profile" height={30} />
          </button>
        </span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span
          style={{
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            padding: "2px 10px",
            fontSize: "large",
            fontWeight: "bold",
            color: "rgb(253,193,81)",
          }}
        >
          Dark mode{" "}
          <Switch
            checked={mode}
            onChange={(e) => dispatch(setDarkModeUpdate(!mode, userId))}
            className="btn btn-outline-warning m-2"
            color="warning"
          />
        </span>
        <span>
          {PremCheck > 10000 && (
            <span>
              {!isPremium && (
                <button
                  onClick={() => dispatch(setPremiumUpdate(true, userId))}
                >
                  Buy Premium
                </button>
              )}
              {isPremium && (
                <button
                  className="p-1"
                  style={{ backgroundColor: "rgb(253, 193, 81)" }}
                  onClick={downloadHandler}
                >
                  <img
                    src={download_icon}
                    title="Download"
                    alt="download"
                    height={30}
                  />
                </button>
              )}
            </span>
          )}{" "}
          <button
            className="p-1"
            style={{ backgroundColor: "rgb(253, 193, 81)" }}
            onClick={chartHandler}
          >
            <img src={chart_icon} alt="Chart" height={30} />
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

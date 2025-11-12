import Head from "./Head/Head";
import Modals from "../../UI/Modal/Modals";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ExpenseMain from "./Expenses/ExpensesMain";
import { firebaseUrl } from "../../../Redux store/ExpenseSlice";
import head_class from "./../../UI/CSS/Head.module.css";
import { fetchUserProfile } from "../../../Redux store/ProfileActions";
import { fetchUserData } from "../../../Redux store/ExpenseActions";
import { fetchUserId } from "../../../Redux store/AuthActions";

const ProfileMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.misc.darkMode);

  const bg_color = !darkMode ? "rgb(255, 253, 221)" : "rgba(0,0,0,0.5)";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    dispatch(fetchUserId(token)).then((id) => {
      dispatch(fetchUserProfile(token));
      dispatch(fetchUserData(firebaseUrl, id));
    });
  }, [dispatch, navigate]);

  return (
    <div
      className={head_class.profile}
      style={{
        backgroundColor: bg_color,
      }}
    >
      <Head />
      <Modals />
      <ExpenseMain />
    </div>
  );
};

export default ProfileMain;

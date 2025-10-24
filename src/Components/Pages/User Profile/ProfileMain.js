import Head from "./Head/Head";
import Modals from "../../UI/Modals";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ProfileActions } from "../../Redux store/ProfileSlice";
import ExpenseMain from "./Expenses/ExpensesMain";
import { ExpenseActions, firebaseUrl } from "../../Redux store/ExpenseSlice";
import axios from "axios";

const ProfileMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const darkMode = useSelector((state) => state.misc.darkMode);

  const bg_color = !darkMode ? "rgba(0,0,0,0.5)" : "palegoldenrod";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAdGYjLFC5DIrMp-l1ZEpgi-d1ntGdDqt0`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: token }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.users && data.users[0]) {
            const user = data.users[0];
            const name = user.displayName || null;
            const pictureUrl = user.photoUrl || null;
            dispatch(ProfileActions.setName(name));
            dispatch(ProfileActions.setProfileUrl(pictureUrl));
          }
        })
        .catch((err) => console.error("Failed to fetch user data", err));
      const fetchExpenses = async () => {
        try {
          console.log(userId);
          const response = await axios.get(
            `${firebaseUrl}/expenses/${userId}.json`
          );
          const data = response.data || {};
          const expenses = Object.entries(data).map(([id, expense]) => ({
            id,
            ...expense,
          }));
          console.log(data, expenses);
          dispatch(
            ExpenseActions.setExpenses(
              expenses.sort((A, B) => new Date(A.date) - new Date(B.date))
            )
          );
          dispatch(ExpenseActions.setFilteredExpenses(expenses));
        } catch (err) {
          console.error("Fetch failed", err);
        }
      };
      fetchExpenses();
    }
  }, [dispatch, navigate, userId]);

  return (
    <div
      style={{
        backgroundColor: bg_color,
        paddingBottom: "10%",
        minHeight: "100vh",
      }}
    >
      <Head />
      <Modals />
      <ExpenseMain />
    </div>
  );
};

export default ProfileMain;

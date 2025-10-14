import Head from "./Head/Head";
import Modals from "../../UI/Modals";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { ProfileActiions } from "../../Redux store/ProfileSlice";
import ExpenseMain from "./Expenses/ExpensesMain";

const ProfileMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          console.log(data);
          if (data.users && data.users[0]) {
            const user = data.users[0];
            const name = user.displayName || "";
            ProfileActiions.setName(name);
            const pictureUrl = user.pictureUrl || "";
            ProfileActiions.setProfileUrl(pictureUrl);
          }
        })
        .catch((err) => console.error("Failed to fetch user data", err));
    }
  }, [dispatch, navigate]);

  return (
    <>
      <Head />
      <Modals />
      <ExpenseMain />
    </>
  );
};

export default ProfileMain;

import Head from "./Head/Head";
import Modals from "../../UI/Modal/Modals";
import ExpenseMain from "./Expenses/ExpensesMain";
import { useSelector } from "react-redux";
import head_class from "./../../UI/CSS/Profile.module.css";

const ProfileMain = () => {
  const darkMode = useSelector((state) => state.misc.darkMode);
  const bg_color = !darkMode ? "rgb(255, 253, 221)" : "rgba(0,0,0,0.5)";

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

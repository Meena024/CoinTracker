import head_class from "../../../UI/CSS/Head.module.css";
import { ModalActions } from "../../../../Redux store/ModalSlice";
import { useDispatch } from "react-redux";
import ExpenseListing from "./ExpensesListing";
import { MiscActions } from "../../../../Redux store/MiscSlice";
import Switch from "@mui/material/Switch";
import Filter from "./Filter";

const ExpenseMain = () => {
  const dispatch = useDispatch();

  const addExpenseHandler = () => {
    dispatch(ModalActions.setModalContent("AddExpense"));
    dispatch(ModalActions.setModal());
  };

  const chartHandler = () => {
    dispatch(ModalActions.setModalContent("Chart"));
    dispatch(ModalActions.setModal());
  };

  return (
    <>
      <div className={head_class.body_content}>
        <span>
          <button onClick={addExpenseHandler}>Add Transaction</button>
        </span>
        <span>
          <Filter />
        </span>
        <span>
          <button onClick={chartHandler}>Chart</button>
        </span>
        <span>
          {" "}
          Dark
          <Switch
            onChange={(e) => dispatch(MiscActions.setDarkMode())}
            color="success"
          />{" "}
          Light
        </span>
      </div>
      <div className={head_class.body_expense}>
        <ExpenseListing />
      </div>
    </>
  );
};

export default ExpenseMain;

import head_class from "../../../UI/Head.module.css";
import { ModalActions } from "../../../Redux store/ModalSlice";
import { useDispatch } from "react-redux";
import ExpenseListing from "./ExpensesListing";
import { MiscActions } from "../../../Redux store/MiscSlice";
import Switch from "@mui/material/Switch";

const ExpenseMain = () => {
  const dispatch = useDispatch();

  const addExpenseHandler = () => {
    dispatch(ModalActions.setModalContent("AddExpense"));
    dispatch(ModalActions.setModal());
  };

  return (
    <>
      <div className={head_class.body_content}>
        <span>
          <h1>Transanctions</h1>
        </span>
        <span>
          <button onClick={addExpenseHandler}>Add Transaction</button>
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
      <div
        style={{
          display: "flex",
          justifyContent: "center", // centers horizontally
          alignItems: "center", // centers vertically
        }}
      >
        <ExpenseListing />
      </div>
    </>
  );
};

export default ExpenseMain;

import head_class from "../../../UI/Head.module.css";
import { ModalActions } from "../../../Redux store/ModalSlice";
import { useDispatch } from "react-redux";

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
          <h1>Expenses</h1>
        </span>
        <span>
          <button onClick={addExpenseHandler}>+ Add Expense</button>
        </span>
      </div>
      <h3 className="mt-3">
        <div className={head_class.total_content}>
          <span>Total:</span>
          <span>$123</span>
        </div>
      </h3>
      <hr
        style={{
          borderTop: "4px solid black",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      />
    </>
  );
};

export default ExpenseMain;

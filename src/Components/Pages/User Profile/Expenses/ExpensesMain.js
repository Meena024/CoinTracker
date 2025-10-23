import head_class from "../../../UI/Head.module.css";
import { ModalActions } from "../../../Redux store/ModalSlice";
import { useDispatch } from "react-redux";
import ExpenseListing from "./ExpensesListing";
import Card from "../../../UI/Card";

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
          <h3>Transanctions</h3>
        </span>
        <span>
          <button onClick={addExpenseHandler}>+ Add Expense</button>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center", // centers horizontally
          alignItems: "center", // centers vertically
          // height: "70vh", // full viewport height
          // width: "50rem",
          marginTop: "50px",
        }}
      >
        <Card>
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
          <ExpenseListing />
        </Card>
      </div>
    </>
  );
};

export default ExpenseMain;

import { useDispatch, useSelector } from "react-redux";
import ExpenseLayout from "./ExpenseLayout";
import expense_class from "./../../../UI/Expense.module.css";
import Card from "../../../UI/Card";
import Filter from "./Filter";
import { ModalActions } from "../../../Redux store/ModalSlice";

const ExpenseListing = () => {
  const dispatch = useDispatch();

  const searchedExpenses = useSelector(
    (state) => state.expense.searchedExpenses
  );

  const expense_list = searchedExpenses.map((exp) => (
    <ExpenseLayout key={exp.id} trans={exp} />
  ));

  const totalAmount = searchedExpenses.reduce(
    (acc, curr) =>
      curr.type === "Credit"
        ? acc + Number(curr.amount)
        : acc - Number(curr.amount),
    0
  );

  const total_class =
    totalAmount < 0 ? expense_class.expense_deb : expense_class.expense_cred;

  const chartHandler = () => {
    dispatch(ModalActions.setModalContent("Chart"));
    dispatch(ModalActions.setModal());
  };

  return (
    <Card>
      <h3>
        <div className={expense_class.total_content}>
          <span>
            <Filter />
          </span>
        </div>

        <div className={expense_class.total_content}>
          <span>Net Balance:</span>
          <span className={total_class}>₹ {Math.abs(totalAmount)}</span>

          <span>
            <button onClick={chartHandler}>Chart</button>
          </span>
        </div>
      </h3>

      <hr
        style={{
          borderTop: "4px solid black",
          minWidth: "800px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      />

      {searchedExpenses.length === 0 && (
        <h2
          style={{
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          No Expenses Found!
        </h2>
      )}
      {expense_list}
    </Card>
  );
};

export default ExpenseListing;

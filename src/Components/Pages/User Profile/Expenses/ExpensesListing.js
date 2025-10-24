import { useSelector } from "react-redux";
import ExpenseLayout from "./ExpenseLayout";
import expense_class from "./../../../UI/Expense.module.css";
import Card from "../../../UI/Card";
import Filter from "./Filter";

const ExpenseListing = () => {
  const filteredExpenses = useSelector(
    (state) => state.expense.filteredExpenses
  );

  const expense_list = filteredExpenses.map((exp) => (
    <ExpenseLayout key={exp.id} trans={exp} />
  ));

  const totalAmount = filteredExpenses.reduce(
    (acc, curr) =>
      curr.type === "Credit"
        ? acc + Number(curr.amount)
        : acc - Number(curr.amount),
    0
  );

  const total_class =
    totalAmount < 0 ? expense_class.expense_deb : expense_class.expense_cred;

  return (
    <Card>
      <h3 className="mt-3">
        <div className={expense_class.total_content}>
          <span>Balance:</span>
          <span className={total_class}>$ {Math.abs(totalAmount)}</span>
        </div>

        <div className={expense_class.total_content}>
          <span>
            <Filter />
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
      {filteredExpenses.length === 0 && (
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

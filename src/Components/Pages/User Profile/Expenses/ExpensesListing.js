import { useSelector } from "react-redux";
import ExpenseLayout from "./ExpenseLayout";
import expense_class from "./../../../UI/Expense.module.css";
import Card from "../../../UI/Card";

const ExpenseListing = () => {
  const expenses = useSelector((state) => state.expense.expenses);

  const expense_list = expenses.map((exp) => (
    <ExpenseLayout key={exp.id} trans={exp} />
  ));

  const totalAmount = expenses.reduce(
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
      </h3>
      <hr
        style={{
          borderTop: "4px solid black",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      />
      {expense_list}
    </Card>
  );
};

export default ExpenseListing;

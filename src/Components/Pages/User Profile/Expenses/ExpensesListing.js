import { useSelector } from "react-redux";
import ExpenseLayout from "./ExpenseLayout";

const ExpenseListing = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  console.log(expenses);
  const expense_list = expenses.map((exp) => (
    <ExpenseLayout key={exp.id} trans={exp} />
  ));
  return <>{expense_list}</>;
};

export default ExpenseListing;

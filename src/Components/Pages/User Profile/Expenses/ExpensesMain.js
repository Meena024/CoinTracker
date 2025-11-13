import head_class from "../../../UI/CSS/Head.module.css";
import ExpenseListing from "./ExpensesListing";
import Filter from "./Filter";

const ExpenseMain = () => {
  return (
    <>
      <div className={head_class.body_filter}>
        <Filter />
      </div>
      <div className={head_class.body_expense}>
        <ExpenseListing />
      </div>
    </>
  );
};

export default ExpenseMain;

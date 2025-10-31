import { useDispatch, useSelector } from "react-redux";
import ExpenseLayout from "./ExpenseLayout";
import expense_class from "./../../../UI/Expense.module.css";
import Card from "../../../UI/Card";
import Filter from "./Filter";
import { ModalActions } from "../../../Redux store/ModalSlice";
import { useState } from "react";

const ExpenseListing = () => {
  const dispatch = useDispatch();
  const [isPremium, setPremium] = useState(false);

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

  const downloadHandler = () => {
    const csvRows = [
      ["Date", "Amount", "Category", "Description", "Type"],
      ...searchedExpenses.map(
        ({ date, amount, category, description, type }) => [
          date,
          amount,
          category,
          description,
          type,
        ]
      ),
    ];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card>
      <h3>
        <div className={expense_class.total_content}>
          <span>
            <Filter />
          </span>
          <span>
            <button onClick={chartHandler}>Chart</button>
          </span>
        </div>

        <div className={expense_class.total_content}>
          <span>Net Balance:</span>
          <span className={total_class}>₹ {Math.abs(totalAmount)}</span>
          <span>
            {!isPremium && (
              <button onClick={() => setPremium(true)}>Buy Premium</button>
            )}
            {isPremium && (
              <button onClick={() => downloadHandler()}>Download</button>
            )}
          </span>{" "}
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
      <div className={expense_class.expense_list}>{expense_list}</div>
    </Card>
  );
};

export default ExpenseListing;

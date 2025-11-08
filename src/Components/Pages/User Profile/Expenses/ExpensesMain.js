import head_class from "../../../UI/CSS/Head.module.css";
import { ModalActions } from "../../../../Redux store/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ExpenseListing from "./ExpensesListing";
import { MiscActions } from "../../../../Redux store/MiscSlice";
import Switch from "@mui/material/Switch";
import Filter from "./Filter";

const ExpenseMain = () => {
  const dispatch = useDispatch();

  const [isPremium, setPremium] = useState(false);

  const searchedExpenses = useSelector(
    (state) => state.expense.searchedExpenses
  );

  const chartHandler = () => {
    dispatch(ModalActions.setModalContent("Chart"));
    dispatch(ModalActions.setModal());
  };

  const downloadHandler = () => {
    const csvRows = [
      ["Filtered transactions"],
      ["Date", "Amount", "Category", "Custom", "Description", "Type"],
      ...searchedExpenses.map(
        ({ date, amount, category, cust_cat, description, type }) => [
          date,
          amount,
          category,
          cust_cat,
          description,
          type,
        ]
      ),
      [],
      ["Net Balance:", totalAmount],
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

  const totalAmount = searchedExpenses.reduce(
    (acc, curr) =>
      curr.type === "Credit"
        ? acc + Number(curr.amount)
        : acc - Number(curr.amount),
    0
  );

  return (
    <>
      <div className={head_class.body_content}>
        <span>
          {!isPremium && (
            <button onClick={() => setPremium(true)}>Buy Premium</button>
          )}
          {isPremium && (
            <button onClick={() => downloadHandler()}>Download</button>
          )}
        </span>
        <span>
          <Filter />
        </span>
        <span>
          <button onClick={chartHandler}>Chart</button>
        </span>
        <span
          style={{
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
          }}
        >
          Light
          <Switch
            onChange={(e) => dispatch(MiscActions.setDarkMode())}
            color="dark"
          />
          Dark
        </span>
      </div>
      <div className={head_class.body_expense}>
        <ExpenseListing />
      </div>
    </>
  );
};

export default ExpenseMain;

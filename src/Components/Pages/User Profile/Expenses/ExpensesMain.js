import head_class from "../../../UI/CSS/Head.module.css";
import { ModalActions } from "../../../../Redux store/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import ExpenseListing from "./ExpensesListing";
import Switch from "@mui/material/Switch";
import Filter from "./Filter";
import {
  setDarkModeUpdate,
  setPremiumUpdate,
} from "../../../../Redux store/MiscActions";

const ExpenseMain = () => {
  const dispatch = useDispatch();

  const isPremium = useSelector((state) => state.misc.premium);
  const searchedExpenses = useSelector(
    (state) => state.expense.searchedExpenses
  );
  const expenses = useSelector((state) => state.expense.expenses);
  const userId = useSelector((state) => state.auth.userId);
  const mode = useSelector((state) => state.misc.darkMode);

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

  const PremCheck = expenses.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );
  if (expenses.length && PremCheck < 10000) {
    console.log("PremCheck < 10000");
    dispatch(setPremiumUpdate(false, userId));
  }

  return (
    <>
      <div className={head_class.body_content}>
        {PremCheck > 10000 && (
          <span>
            {!isPremium && (
              <button onClick={() => dispatch(setPremiumUpdate(true, userId))}>
                Buy Premium
              </button>
            )}
            {isPremium && (
              <button onClick={() => downloadHandler()}>Download</button>
            )}
          </span>
        )}
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
            border: "1px solid black",
            borderRadius: "10px",
            padding: "2px 10px",
            fontSize: "large",
            fontWeight: "bold",
          }}
        >
          Dark mode
          <Switch
            checked={mode}
            onChange={(e) => dispatch(setDarkModeUpdate(!mode, userId))}
            color="dark"
          />
        </span>
      </div>
      <div className={head_class.body_expense}>
        <ExpenseListing />
      </div>
    </>
  );
};

export default ExpenseMain;

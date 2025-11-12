import { useState, useEffect } from "react";
import expense_class from "./../../../UI/CSS/Expense.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseActions } from "../../../../Redux store/ExpenseSlice";
import form_classes from "./../../../UI/CSS/Form.module.css";

const Filter = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expenses);

  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [dateError, setDateError] = useState("");
  const [year, setYear] = useState("");

  const years = Array.from(
    new Set(expenses.map((exp) => new Date(exp.date).getFullYear()))
  ).sort((a, b) => a - b);

  useEffect(() => {
    if (filter === "category" && category) {
      const filteredExpenses =
        category === "All"
          ? expenses
          : expenses.filter((exp) => exp.category === category);

      dispatch(ExpenseActions.setFilteredExpenses(filteredExpenses));
      dispatch(ExpenseActions.setSearchedExpenses(filteredExpenses));
    }
  }, [category, filter, expenses, dispatch]);

  useEffect(() => {
    if (filter === "custom" && dateRange.start && dateRange.end) {
      if (new Date(dateRange.end) < new Date(dateRange.start)) {
        setDateError("End date cannot be earlier than start date.");
        return;
      } else {
        setDateError("");
      }

      const filteredExpenses = expenses.filter((exp) => {
        const expDate = new Date(exp.date);
        return (
          expDate >= new Date(dateRange.start) &&
          expDate <= new Date(dateRange.end)
        );
      });

      dispatch(ExpenseActions.setFilteredExpenses(filteredExpenses));
      dispatch(ExpenseActions.setSearchedExpenses(filteredExpenses));
    }
  }, [dateRange, filter, expenses, dispatch]);

  useEffect(() => {
    if (filter === "year" && year) {
      const filteredExpenses = expenses.filter(
        (exp) => new Date(exp.date).getFullYear() === Number(year)
      );
      dispatch(ExpenseActions.setFilteredExpenses(filteredExpenses));
      dispatch(ExpenseActions.setSearchedExpenses(filteredExpenses));
    }
  }, [year, filter, expenses, dispatch]);

  useEffect(() => {
    if (filter === "Credit" || filter === "Debit") {
      const filteredExpenses = expenses.filter((exp) => exp.type === filter);
      dispatch(ExpenseActions.setFilteredExpenses(filteredExpenses));
      dispatch(ExpenseActions.setSearchedExpenses(filteredExpenses));
    }
  }, [filter, expenses, dispatch]);

  return (
    <div className={expense_class.filter}>
      <select
        id="maj_filter"
        name="maj_filter"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setCategory("");
          setDateRange({ start: "", end: "" });
          setDateError("");
          setYear("");
          dispatch(ExpenseActions.setFilteredExpenses(expenses));
        }}
      >
        <option value="" disabled>
          Filter By
        </option>
        <option value="All">No Filter</option>
        <option value="category">Category</option>
        <option value="custom">Custom Range</option>
        <option value="year">Year</option>
        <option value="Credit">Credit</option>
        <option value="Debit">Debit</option>
      </select>

      {filter === "category" && (
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>
            Select Category
          </option>
          <option value="Entertainment">Entertainment</option>
          <option value="Travel">Travel</option>
          <option value="Education">Education</option>
          <option value="Hospital">Hospital</option>
          <option value="Salary">Salary</option>
          <option value="Custom">Custom</option>
        </select>
      )}

      {filter === "custom" && (
        <form className={form_classes.form}>
          <div
            style={{
              margin: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
            <span
              style={{
                fontSize: "large",
                fontWeight: "bold",
              }}
            >
              to
            </span>
            <input
              type="date"
              value={dateRange.end}
              min={dateRange.start || ""}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </div>

          {dateError && (
            <p style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }}>
              {dateError}
            </p>
          )}
        </form>
      )}

      {filter === "year" && (
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="" disabled>
            Select Year
          </option>
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Filter;

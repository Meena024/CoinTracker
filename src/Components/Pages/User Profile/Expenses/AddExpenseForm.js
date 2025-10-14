import { useRef, useState } from "react";
import { ModalActions } from "../../../Redux store/ModalSlice";
import form_classes from "../../../UI/Form.module.css";
import { useDispatch } from "react-redux";
import { ExpenseActions } from "../../../Redux store/ExpenseSlice";

const AddExpense = () => {
  const dispatch = useDispatch();

  const dateRef = useRef();
  const amountRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();
  const isDebRef = useRef();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const addNewExpenseHandler = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const expenseDetails = {
      date: dateRef.current.value.trim(),
      amount: amountRef.current.value,
      description: descRef.current.value,
      category: categoryRef.current.value,
      type: isDebRef.current.value,
    };
    dispatch(ExpenseActions.addExpense(expenseDetails));
    console.log(expenseDetails);
    dispatch(ModalActions.unsetModal());
    setLoading(false);
  };
  return (
    <>
      <h1>Add Expense</h1>
      <form onSubmit={addNewExpenseHandler} className={form_classes.form}>
        <div style={{ margin: "20px" }}>
          <input
            id="date"
            type="date"
            placeholder="Date"
            ref={dateRef}
            autoComplete="date"
            required
          />
        </div>

        <div style={{ margin: "20px" }}>
          <input
            id="amount"
            type="number"
            placeholder="Amount"
            ref={amountRef}
            autoComplete="transaction-amount"
            required
          />
        </div>

        <div style={{ margin: "20px" }}>
          <input
            id="description"
            type="text"
            placeholder="Description"
            ref={descRef}
            autoComplete="text"
            required
          />
        </div>

        <div style={{ margin: "20px" }}>
          <select id="category" ref={categoryRef} required defaultValue="">
            <option value="" disabled>
              Select Category
            </option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel Expenses</option>
            <option value="Education">Education</option>
            <option value="Hospital">Hospital</option>
            <option value="Salary">Salary</option>
          </select>
        </div>

        <div style={{ margin: "20px" }}>
          <select id="isCredit" ref={isDebRef} required defaultValue="">
            <option value="" disabled>
              Select Type
            </option>
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
        </div>

        {error && <div className="text-danger text-center mt-2">{error}</div>}

        <div
          style={{
            margin: "5%",
            display: "flex",
            justifyContent: "center",
            gap: "2px",
          }}
        >
          <button
            type="button"
            onClick={() => dispatch(ModalActions.unsetModal())}
          >
            Cancel
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Adding new Expense..." : "Add Expense"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddExpense;

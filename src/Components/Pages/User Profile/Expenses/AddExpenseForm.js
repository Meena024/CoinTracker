import { useEffect, useState } from "react";
import { ModalActions } from "../../../Redux store/ModalSlice";
import form_classes from "../../../UI/Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseActions, firebaseUrl } from "../../../Redux store/ExpenseSlice";
import axios from "axios";

const AddExpense = () => {
  const dispatch = useDispatch();
  const isEdit = useSelector((state) => state.expense.isEdit);
  const edit_exp = useSelector((state) => state.expense.edit_exp);
  const userId = useSelector((state) => state.auth.userId);

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && edit_exp) {
      setDate(edit_exp.date);
      setAmount(edit_exp.amount);
      setDesc(edit_exp.description);
      setCategory(edit_exp.category);
      setType(edit_exp.type);
    } else {
      setDate("");
      setAmount("");
      setDesc("");
      setCategory("");
      setType("");
    }
  }, [isEdit, edit_exp]);

  const addNewExpenseHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const expenseDetails = {
      id: isEdit ? edit_exp.id : Math.floor(Math.random() * 100),
      date,
      amount,
      description: desc.charAt(0).toUpperCase() + desc.slice(1),
      category,
      type,
    };
    console.log(userId);

    await axios.put(
      `${firebaseUrl}/expenses/${userId}/${expenseDetails.id}.json`,
      expenseDetails
    );
    if (isEdit) {
      dispatch(ExpenseActions.editExpense(expenseDetails));
    } else {
      dispatch(ExpenseActions.addExpense(expenseDetails));
    }

    console.log(expenseDetails);
    dispatch(ExpenseActions.isEditExpense(false));
    dispatch(ExpenseActions.setEdit_exp(null));
    dispatch(ModalActions.unsetModal());
    setLoading(false);
  };

  const cancelHandler = () => {
    dispatch(ExpenseActions.isEditExpense(false));
    dispatch(ExpenseActions.setEdit_exp(null));
    dispatch(ModalActions.unsetModal());
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await axios.delete(`${firebaseUrl}/expenses/${userId}/${id}.json`);
      dispatch(ExpenseActions.delete_exp(id));
      dispatch(ExpenseActions.isEditExpense(false));
      dispatch(ExpenseActions.setEdit_exp(null));
      dispatch(ModalActions.unsetModal());
    }
  };
  return (
    <>
      {!isEdit && <h1>Add Transanction</h1>}
      {isEdit && <h1>Edit Transaction</h1>}
      <form onSubmit={addNewExpenseHandler} className={form_classes.form}>
        <div style={{ margin: "20px" }}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div style={{ margin: "20px" }}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div style={{ margin: "20px" }}>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
          />
        </div>

        <div style={{ margin: "20px" }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
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
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
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
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button type="submit" disabled={loading}>
            {loading
              ? isEdit
                ? "Updating..."
                : "Adding..."
              : isEdit
              ? "Update"
              : "Add"}
          </button>
          {isEdit && (
            <button type="button" onClick={() => deleteHandler(edit_exp.id)}>
              Delete
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default AddExpense;

import { ExpenseActions } from "./ExpenseSlice";
import { ModalActions } from "./ModalSlice";
import { firebaseUrl } from "./ExpenseSlice";

// ✅ Save or edit expense
export const saveExpense = ({ expenseDetails, userId, isEdit }) => {
  return async (dispatch) => {
    const response = await fetch(
      `${firebaseUrl}/expenses/${userId}/${expenseDetails.id}.json`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseDetails),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save expense");
    }

    if (isEdit) {
      dispatch(ExpenseActions.editExpense(expenseDetails));
    } else {
      dispatch(ExpenseActions.addExpense(expenseDetails));
    }

    dispatch(ExpenseActions.isEditExpense(false));
    dispatch(ExpenseActions.setEdit_exp(null));
    dispatch(ModalActions.unsetModal());
  };
};

// ✅ Remove expense
export const removeExpense = (id, userId) => {
  return async (dispatch) => {
    const response = await fetch(
      `${firebaseUrl}/expenses/${userId}/${id}.json`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error("Failed to delete expense");
    }

    dispatch(ExpenseActions.delete_exp(id));
    dispatch(ExpenseActions.isEditExpense(false));
    dispatch(ExpenseActions.setEdit_exp(null));
    dispatch(ModalActions.unsetModal());
  };
};

// ✅ Fetch expenses
export const fetchExpenses = (firebaseUrl, userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${firebaseUrl}/expenses/${userId}.json`);
      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data = await response.json();
      const expenses = data
        ? Object.entries(data).map(([id, expense]) => ({ id, ...expense }))
        : [];

      dispatch(
        ExpenseActions.setExpenses(
          expenses.sort((A, B) => new Date(A.date) - new Date(B.date))
        )
      );
      dispatch(ExpenseActions.setFilteredExpenses(expenses));
    } catch (err) {
      console.error("Fetch expenses failed", err);
    }
  };
};

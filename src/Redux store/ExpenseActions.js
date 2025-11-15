import { ExpenseActions } from "./ExpenseSlice";
import { ModalActions } from "./ModalSlice";
import { firebaseUrl } from "./ExpenseSlice";
import { MiscActions } from "./MiscSlice";

// Save or edit expense
export const saveExpense = ({ expenseDetails, userId, isEdit }) => {
  return async (dispatch) => {
    const response = await fetch(
      `${firebaseUrl}/${userId}/expense/${expenseDetails.id}.json`,
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

// Remove expense
export const removeExpense = (id, userId) => {
  return async (dispatch) => {
    const response = await fetch(
      `${firebaseUrl}/${userId}/expense/${id}.json`,
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

// fetch user data
export const fetchUserData = (firebaseUrl, userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${firebaseUrl}/${userId}.json`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      if (!data) {
        console.warn("No data found for user:", userId);
        return;
      }

      console.log("Database Data:", data);
      // Extract expenses safely
      const expensesData = data.expense || {};
      const expenses = Object.entries(expensesData).map(([id, expense]) => ({
        id,
        ...expense,
      }));

      // Sort by date (newest first)
      const sortedExpenses = expenses.sort(
        (A, B) => new Date(B.date) - new Date(A.date)
      );

      // Dispatch Expense slice initialization
      dispatch(ExpenseActions.setExpenses(sortedExpenses));
      dispatch(ExpenseActions.setFilteredExpenses(sortedExpenses));

      // Dispatch Misc slice initialization
      if (data.Premium !== undefined) {
        dispatch(MiscActions.setPremium(data.Premium));
      }
      if (data.darkMode !== undefined) {
        dispatch(MiscActions.setDarkMode(data.darkMode));
      }
    } catch (err) {
      console.error("Fetch user data failed ", err);
    }
  };
};

import { ExpenseActions } from "./ExpenseSlice";
import { ModalActions } from "./ModalSlice";
import axios from "axios";
import { firebaseUrl } from "./ExpenseSlice";

export const saveExpense = ({ expenseDetails, userId, isEdit }) => {
  return async (dispatch) => {
    await axios.put(
      `${firebaseUrl}/expenses/${userId}/${expenseDetails.id}.json`,
      expenseDetails
    );

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

export const removeExpense = (id, userId) => {
  return async (dispatch) => {
    await axios.delete(`${firebaseUrl}/expenses/${userId}/${id}.json`);
    dispatch(ExpenseActions.delete_exp(id));
    dispatch(ExpenseActions.isEditExpense(false));
    dispatch(ExpenseActions.setEdit_exp(null));
    dispatch(ModalActions.unsetModal());
  };
};

export const fetchExpenses = (firebaseUrl, userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${firebaseUrl}/expenses/${userId}.json`
      );
      const data = response.data || {};

      const expenses = Object.entries(data).map(([id, expense]) => ({
        id,
        ...expense,
      }));

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

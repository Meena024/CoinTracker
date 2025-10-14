import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  isEdit: false,
  edit_exp: null,
};

const ExpenseSlice = createSlice({
  name: "Expense",
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    addExpense: (state, action) => {
      state.expenses = [...state.expenses, action.payload];
      state.expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    editExpense: (state, action) => {
      state.expenses = state.expenses
        .filter((exp) => exp.id !== action.payload.id)
        .concat(action.payload);
      state.expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    isEditExpense: (state, action) => {
      state.isEdit = action.payload;
    },
    setEdit_exp: (state, action) => {
      state.edit_exp = action.payload;
    },
  },
});

export const ExpenseActions = ExpenseSlice.actions;
export default ExpenseSlice;

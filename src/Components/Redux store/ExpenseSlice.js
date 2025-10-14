import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
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
    },
  },
});

export const ExpenseActions = ExpenseSlice.actions;
export default ExpenseSlice;

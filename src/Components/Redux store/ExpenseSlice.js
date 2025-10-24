import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  filteredExpenses: [],
  isEdit: false,
  edit_exp: null,
};

export const firebaseUrl =
  "https://expense-tracker-realtime-db-default-rtdb.firebaseio.com";

const ExpenseSlice = createSlice({
  name: "Expense",
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    setFilteredExpenses: (state, action) => {
      state.filteredExpenses = action.payload;
    },
    addExpense: (state, action) => {
      state.expenses = [...state.expenses, action.payload];
      state.expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
      state.filteredExpenses = state.expenses;
    },
    editExpense: (state, action) => {
      state.expenses = state.expenses
        .filter((exp) => exp.id !== action.payload.id)
        .concat(action.payload);
      state.expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
      state.filteredExpenses = state.filteredExpenses
        .filter((exp) => exp.id !== action.payload.id)
        .concat(action.payload);
      state.filteredExpenses.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    },
    isEditExpense: (state, action) => {
      state.isEdit = action.payload;
    },
    setEdit_exp: (state, action) => {
      state.edit_exp = action.payload;
    },
    delete_exp: (state, action) => {
      state.expenses = state.expenses.filter(
        (exp) => exp.id !== action.payload
      );
      state.filteredExpenses = state.filteredExpenses.filter(
        (exp) => exp.id !== action.payload
      );
    },
  },
});

export const ExpenseActions = ExpenseSlice.actions;
export default ExpenseSlice;

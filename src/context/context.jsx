import { createContext, useContext, useEffect, useState } from "react";

const ExpenseContext = createContext();

const data = localStorage.getItem("transactions")
  ? JSON.parse(localStorage.getItem("transactions"))
  : [];

const ExpenseContextProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(data);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const updateTotals = () => {
    const incomeVal = transactions
      .filter((transaction) => transaction.amount > 0)
      .map((transaction) => transaction.amount)
      .reduce((curr, val) => curr + val, 0);

    const expenseVal = transactions
      .filter((transaction) => transaction.amount < 0)
      .map((transaction) => transaction.amount)
      .reduce((curr, val) => curr + val, 0);

    const balanceVal = transactions
      .map((transaction) => transaction.amount)
      .reduce((curr, val) => curr + val, 0);

    setIncome(incomeVal);
    setExpenses(expenseVal);
    setBalance(balanceVal);
  };

  useEffect(() => {
    updateTotals();
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("transactions",JSON.stringify (transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((item) => item.id !== id);

    setTransactions(updatedTransactions);
  };

  const values = {
    transactions,
    balance,
    income,
    expenses,
    addTransaction,
    deleteTransaction,
  };
  return (
    <ExpenseContext.Provider value={values}>{children}</ExpenseContext.Provider>
  );
};

//custom hook to export context
const useExpenseContext = () => {
  return useContext(ExpenseContext);
};

export { ExpenseContextProvider, useExpenseContext };

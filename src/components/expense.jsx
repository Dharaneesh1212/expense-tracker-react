import { useState, useContext } from "react";
import { useExpenseContext } from "../context/context";

const Expense = () => {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    income,
    expenses,
    balance,
  } = useExpenseContext();

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (category && amount) {
      const newTransaction = {
        id: Date.now(),
        category,
        amount: Number(amount),
      };

      addTransaction(newTransaction);

      setCategory("");
      setAmount("");
    }
  };

  return (
    <main className="flex items-center justify-center">
      <div className="flex items-center justify-start flex-col h-full w-[30rem] bg-white pt-6 m-4 gap-4 shadow-[0_5px_15px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-center flex-col">
          <p className="text-4xl font-serif">Your Balance</p>
          <span className="text-3xl font-semibold">₹{balance}</span>
        </div>
        <div className="w-[20rem] h-[6rem] flex items-center justify-around flex-row bg-white shadow-[0_5px_15px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-center flex-col text-2xl font-semibold">
            <p>INCOME</p>
            <span className="text-green-500">₹{income}</span>
          </div>
          <span className="text-5xl font-small">|</span>
          <div className="flex items-center justify-center flex-col text-2xl font-semibold">
            <p>EXPENSES</p>
            <span className="text-red-500">₹{expenses}</span>
          </div>
        </div>
        <div className="w-[25rem] h-[3rem] text-3xl">
          <span>History</span>
          <hr className="h-[2px] bg-slate-500" />
        </div>
        {transactions.length > 0 && (
          <ul className="text-xl w-[25rem] bg-white flex flex-col gap-3 rounded-sm">
            {transactions.map((item) => {
              const { id, category, amount } = item;
              const transactionType = amount > 0 ? "plus" : "minus";
              return (
                <li
                  key={id}
                  className="{transactionType} flex items-center justify-evenly h-[2.5rem] shadow-[0_5px_10px_rgba(0,0,0,0.35)]"
                >
                  <span className="capitalize">{category}</span>
                  <span>₹{amount}</span>
                  <button
                    className="bg-red-600 text-xl font-semibold text-white h-8 w-6 rounded-md"
                    onClick={() => {
                      deleteTransaction(id);
                    }}
                  >
                    X
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <div className="w-[25rem] h-[2.5rem] text-3xl">
          <span>Add Transaction</span>
          <hr className="h-[2px] bg-slate-500" />
        </div>
        <form onSubmit={submitHandler}>
          <div className="flex items-center justify-center flex-col gap-4 h-[13rem]">
            <div className="w-[25rem] h-[6rem] text-2xl flex items-start justify-center flex-col gap-2">
              <p>Category</p>
              <input
                type="text"
                placeholder="Type"
                className="shadow-[0_0px_15px_rgba(0,0,0,0.35)] p-1 rounded-md capitalize"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            </div>
            <div className="w-[25rem] h-[5rem] text-2xl flex items-start justify-center flex-col gap-2">
              <p>Amount</p>
              <span className="text-xl">
                (Enter <span>Income</span> with + and <span>Expense</span> with
                -)
              </span>
              <input
                type="number"
                placeholder="₹ Amount"
                className="shadow-[0_0px_15px_rgba(0,0,0,0.35)] p-1 rounded-md"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-[24rem] h-[6rem]">
            <button
              className="bg-black text-white h-10 w-72 text-2xl font-semibold rounded-md"
              onClick={(e) => {}}
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Expense;

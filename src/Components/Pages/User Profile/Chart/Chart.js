import { useSelector } from "react-redux";
import MyPieChart from "./PieChart";
import styles from "./../../../UI/Chart.module.css";

const Chart = () => {
  const filteredExpenses = useSelector(
    (state) => state.expense.filteredExpenses
  );

  const creditData = filteredExpenses.filter((exp) => exp.type === "Credit");
  const debitData = filteredExpenses.filter((exp) => exp.type === "Debit");

  const aggregateByCategory = (data) =>
    Object.entries(
      data.reduce((acc, exp) => {
        const cat = exp.category;
        const amt = Number(exp.amount);
        acc[cat] = (acc[cat] || 0) + amt;
        return acc;
      }, {})
    ).map(([category, total]) => ({ name: category, value: total }));

  const creditTotals = aggregateByCategory(creditData);
  const debitTotals = aggregateByCategory(debitData);

  const totalCredit = creditTotals.reduce((sum, c) => sum + c.value, 0);
  const totalDebit = debitTotals.reduce((sum, d) => sum + d.value, 0);
  const netBalance = totalCredit - totalDebit;

  return (
    <>
      <div className={styles.chartContainer}>
        <MyPieChart title="Debit" data={debitTotals} />
        <MyPieChart title="Credit" data={creditTotals} />
      </div>
      <div className={styles.summaryContainer}>
        <div className={styles.summaryRow}>
          <label>Total Debit:</label>
          <div className={styles.debit}>₹{totalDebit}</div>

          <label>Total Credit:</label>
          <div className={styles.credit}>₹{totalCredit}</div>

          <label>Net Balance:</label>
          <div className={netBalance < 0 ? styles.debit : styles.credit}>
            ₹{Math.abs(netBalance)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;

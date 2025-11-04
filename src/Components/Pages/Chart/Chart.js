import { useSelector } from "react-redux";
import MyPieChart from "./PieChart";
import styles from "./../../UI/CSS/Chart.module.css";

const Chart = () => {
  const chartData = useSelector((state) => state.expense.searchedExpenses);

  const creditData = chartData.filter((exp) => exp.type === "Credit");
  const debitData = chartData.filter((exp) => exp.type === "Debit");

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

          <label style={{ fontWeight: "bolder" }}>Net Balance:</label>
          <div className={netBalance < 0 ? styles.debit : styles.credit}>
            <h2 style={{ fontWeight: "bolder" }}>₹{Math.abs(netBalance)}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;

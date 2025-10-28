import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./../../../UI/Chart.module.css";

const COLORS = [
  "#5ccc87ff",
  "#f66363ff",
  "#cfdf44ff",
  "#63a6e1ff",
  "#9591e2ff",
  "#dd6ec7ff",
  "#21b5c5ff",
];

const MyPieChart = ({ title, data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={styles.chartBox}>
      <h1 className={styles.chartTitle}>{title}</h1>

      {data.length === 0 ? (
        <h3 className={styles.noData}>
          No {title.toLowerCase()} transactions available!
        </h3>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie data={data} outerRadius={100} dataKey="value">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(val) => `₹${val}`}
              contentStyle={{
                backgroundColor: "black",
                borderRadius: "10px",
                border: "1px solid white",
              }}
              itemStyle={{ color: "white" }}
            />

            <Legend
              layout="vertical"
              formatter={(value) => {
                const item = data.find((d) => d.name === value);
                const percent = ((item.value / total) * 100).toFixed(1);
                return `${value} (${percent}%)`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MyPieChart;

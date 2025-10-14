import { Col, Row } from "react-bootstrap";
import expense_classes from "../../../UI/Expense.module.css";

const ExpenseLayout = ({ trans }) => {
  console.log(trans);

  const date = new Date(trans.date);

  const exp_class =
    trans.type === "Debit"
      ? expense_classes.expense_deb
      : expense_classes.expense_cred;

  return (
    <div className={exp_class} onClick={() => alert("edit")}>
      <Row>
        <Col>
          <div>
            <span style={{ fontWeight: "bold" }}>{trans.category}</span> /{" "}
            {trans.description ? trans.description : "-"}
          </div>
          <div>
            {date.getDate()} {date.toLocaleString("default", { month: "long" })}{" "}
            {date.getFullYear()} (
            {date.toLocaleDateString("en-US", { weekday: "long" })})
          </div>
        </Col>
        <Col>
          <div
            style={{
              textAlign: "right",
              fontSize: "25px",
              fontWeight: "bolder",
            }}
          >
            ${trans.amount}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ExpenseLayout;

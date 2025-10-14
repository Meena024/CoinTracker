import { Col, Row } from "react-bootstrap";
import expense_classes from "../../../UI/Expense.module.css";
import { ModalActions } from "../../../Redux store/ModalSlice";
import { useDispatch } from "react-redux";
import { ExpenseActions } from "../../../Redux store/ExpenseSlice";

const ExpenseLayout = ({ trans }) => {
  const dispatch = useDispatch();
  console.log(trans);

  const date = new Date(trans.date);

  const exp_class =
    trans.type === "Debit"
      ? expense_classes.expense_deb
      : expense_classes.expense_cred;

  const editExpense = (exp) => {
    console.log("edit", exp);
    dispatch(ExpenseActions.isEditExpense(true));
    dispatch(ExpenseActions.setEdit_exp(exp));
    dispatch(ModalActions.setModalContent("AddExpense"));
    dispatch(ModalActions.setModal());
  };

  return (
    <div className={exp_class} onClick={() => editExpense(trans)}>
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

import { Col, Row } from "react-bootstrap";
import expense_classes from "../../../UI/Expense.module.css";
import { ModalActions } from "../../../Redux store/ModalSlice";
import { useDispatch } from "react-redux";
import { ExpenseActions } from "../../../Redux store/ExpenseSlice";

const ExpenseLayout = ({ trans }) => {
  const dispatch = useDispatch();

  const date = new Date(trans.date);

  const exp_amount =
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
    <div className={expense_classes.expense} onClick={() => editExpense(trans)}>
      <Row>
        <Col>
          <div>
            <span
              style={{
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              {trans.category}
            </span>{" "}
            /{" "}
            <span
              style={{
                fontStyle: "italic",
                fontSize: "20px",
              }}
            >
              {trans.description ? trans.description : "-"}
            </span>
          </div>
          <div>
            {date.getDate()} {date.toLocaleString("default", { month: "long" })}{" "}
            {date.getFullYear()} (
            {date.toLocaleDateString("en-US", { weekday: "long" })})
          </div>
        </Col>
        <Col>
          <div className={exp_amount}>$ {trans.amount}</div>
        </Col>
      </Row>
    </div>
  );
};

export default ExpenseLayout;

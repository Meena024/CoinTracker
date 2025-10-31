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
    <Row className={expense_classes.expense} onClick={() => editExpense(trans)}>
      <Col xs={9}>
        <div>
          <span
            style={{
              fontWeight: "bold",
              fontSize: "25px",
            }}
          >
            {trans.category}
          </span>
          {trans.description ? (
            <span
              style={{
                fontStyle: "italic",
                fontSize: "20px",
              }}
            >
              {" "}
              / {trans.description}
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          {date.getDate()} {date.toLocaleString("default", { month: "long" })}{" "}
          {date.getFullYear()} (
          {date.toLocaleDateString("en-US", { weekday: "long" })})
        </div>
      </Col>
      <Col className={exp_amount}>₹ {trans.amount}</Col>
    </Row>
  );
};

export default ExpenseLayout;

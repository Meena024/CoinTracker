import "./Modals.css";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { ModalActions } from "../Redux store/ModalSlice";
import EditProfile from "../Pages/User Profile/Head/EditProfile";
import AddExpense from "../Pages/User Profile/Expenses/AddExpenseForm";
import { ExpenseActions } from "../Redux store/ExpenseSlice";

const Modals = () => {
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state) => state.modal.isModalVisible);
  const modalContent = useSelector((state) => state.modal.modalContent);

  const renderContent = () => {
    switch (modalContent) {
      case "EditProfile":
        return <EditProfile />;
      case "AddExpense":
        return <AddExpense />;
      default:
        return null;
    }
  };

  const closeModalHandler = () => {
    if (modalContent === "AddExpense") {
      dispatch(ExpenseActions.isEditExpense(false));
      dispatch(ExpenseActions.setEdit_exp(null));
    }

    dispatch(ModalActions.unsetModal());
  };

  return (
    <>
      {isModalVisible && (
        <div className="modal-overlay" onClick={closeModalHandler}>
          <div onClick={(e) => e.stopPropagation()}>
            <Card>{renderContent()}</Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Modals;

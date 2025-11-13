import "./Modals.css";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { ModalActions } from "../../../Redux store/ModalSlice";
import EditProfile from "../../Pages/User Profile/Head/EditProfile";
import AddExpense from "../../Pages/User Profile/Expenses/AddExpenseForm";
import { ExpenseActions } from "../../../Redux store/ExpenseSlice";
import Chart from "../../Pages/Chart/Chart";

const Modals = () => {
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state) => state.modal.isModalVisible);
  const modalContent = useSelector((state) => state.modal.modalContent);
  const imgURL = useSelector((state) => state.profile.profileUrl);

  const renderContent = () => {
    switch (modalContent) {
      case "EditProfile":
        return <EditProfile />;
      case "AddExpense":
        return <AddExpense />;
      case "Chart":
        return <Chart />;
      case "ZoomImage":
        return (
          <img
            src={imgURL}
            alt="Profile"
            height={500}
            width={500}
            className="rounded border"
          />
        );
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

import "./Modals.css";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { ModalActions } from "../Redux store/ModalSlice";
import EditProfile from "../Pages/EditProfile";

const Modals = () => {
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state) => state.modal.isModalVisible);
  const modalContent = useSelector((state) => state.modal.modalContent);

  const renderContent = () => {
    switch (modalContent) {
      case "EditProfile":
        return <EditProfile />;
      default:
        return null;
    }
  };

  return (
    <>
      {isModalVisible && (
        <div
          className="modal-overlay"
          onClick={() => dispatch(ModalActions.unsetModal())}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Card>{renderContent()}</Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Modals;

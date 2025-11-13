import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthAction } from "../../../Redux store/AuthSlice";
import { fetchUserId } from "../../../Redux store/AuthActions";
import { fetchUserProfile } from "../../../Redux store/ProfileActions";
import { fetchUserData } from "../../../Redux store/ExpenseActions";
import { firebaseUrl } from "../../../Redux store/ExpenseSlice";

export const useAuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(AuthAction.userAuthenticated(false));
      return;
    }

    dispatch(AuthAction.userAuthenticated(true));
    dispatch(fetchUserId(token)).then((id) => {
      dispatch(fetchUserProfile(token));
      dispatch(fetchUserData(firebaseUrl, id));
    });
  }, [dispatch]);
};

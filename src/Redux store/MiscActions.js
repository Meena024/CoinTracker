import { firebaseUrl } from "./ExpenseSlice";
import { MiscActions } from "./MiscSlice";

//  Update premium
export const setPremiumUpdate = (val, userId) => {
  return async (dispatch) => {
    const response = await fetch(`${firebaseUrl}/${userId}/Premium.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(val),
    });

    if (!response.ok) {
      throw new Error("Failed to update premium");
    }

    dispatch(MiscActions.setPremium(val));
    console.log("Premium:", val ? "on" : "off");
  };
};

//  Update darkMode
export const setDarkModeUpdate = (val, userId) => {
  return async (dispatch) => {
    console.log("darkmode:", val ? "on" : "off");
    dispatch(MiscActions.setDarkMode(val));
    const response = await fetch(`${firebaseUrl}/${userId}/darkMode.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(val),
    });

    if (!response.ok) {
      throw new Error("Failed to update mode");
    }
  };
};

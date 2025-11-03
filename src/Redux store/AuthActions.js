import { AuthAction } from "./AuthSlice";

export const fetchUserId = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAdGYjLFC5DIrMp-l1ZEpgi-d1ntGdDqt0`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: token }),
        }
      );

      const data = await response.json();
      if (!data.users || !data.users[0]) {
        console.warn("User not found");
        return null;
      }

      const userId = data.users[0].localId;
      dispatch(AuthAction.setUserId(userId));
    } catch (err) {
      console.error("Failed to fetch userId", err);
      return null;
    }
  };
};

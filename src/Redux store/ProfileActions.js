import { ProfileActions } from "./ProfileSlice";

export const fetchUserProfile = (token) => {
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

      if (data.users && data.users[0]) {
        const user = data.users[0];
        const name = user.displayName || null;
        const pictureUrl = user.photoUrl || null;

        dispatch(ProfileActions.setName(name));
        dispatch(ProfileActions.setProfileUrl(pictureUrl));
      } else {
        console.error("No user found in response");
      }
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };
};

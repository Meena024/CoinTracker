import { ProfileActions } from "./ProfileSlice";

export const fetchUserProfile = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCdDyLfXnyTrvbTA4whPdjq4GY3KqZ8dWc`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: token }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      const user = data?.users?.[0];
      if (!user) {
        console.error("No user found in response");
        return;
      }

      dispatch(ProfileActions.setName(user.displayName || null));
      dispatch(ProfileActions.setProfileUrl(user.photoUrl || null));
      dispatch(
        ProfileActions.setEmailInfo({
          email: user.email,
          emailVerified: user.emailVerified,
        })
      );
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    }
  };
};

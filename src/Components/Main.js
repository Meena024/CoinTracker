import { Route, Routes } from "react-router";
import ProfileMain from "./Pages/User Profile/ProfileMain";
import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SignUp";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import Footer from "./Footer";
import Header from "./Header";
import { useSelector } from "react-redux";

const Main = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      {!isLoggedIn && <Header />}
      <Footer />
      <Routes>
        <Route path="/UserProfile" element={<ProfileMain />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="*" element={<h1>Page Not Found!</h1>} />
        <Route path="" element={<Login />} />
      </Routes>
    </>
  );
};

export default Main;

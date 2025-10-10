import Header from "./Header";
import { Route, Routes } from "react-router";
import Welcome from "./Pages/Welcome/Welcome";
import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SignUp";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";

const Main = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/Welcome" element={<Welcome />} />
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

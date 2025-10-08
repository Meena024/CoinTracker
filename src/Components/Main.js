import Header from "./Header";
import { Route, Routes } from "react-router";
import Welcome from "./Pages/Welcome/Welcome";
import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SignUp";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import Card from "./UI/Card";
const Main = () => {
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center", // centers horizontally
          alignItems: "center", // centers vertically
          height: "70vh", // full viewport height
        }}
      >
        <Card>
          <Routes>
            <Route path="/Welcome" element={<Welcome />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="*" element={<h1>Page Not Found!</h1>} />
            <Route path="" element={<Login />} />
          </Routes>
        </Card>
      </div>
    </>
  );
};

export default Main;

import head_classes from "./UI/CSS/Head.module.css";
import logo from "../Assets/coin tracker.png";

const Header = () => {
  return (
    <div className={head_classes.head_dark}>
      <div className={head_classes.header}>
        <span style={{ paddingLeft: "10%" }}>
          <img src={logo} style={{ height: 150 }} alt="logo" />
        </span>
        <span style={{ paddingRight: "10%" }}>
          <h1>Welcome to COIN TRACKER!</h1>
          <h2 className="ms-4">Track it, Know it, Own it.</h2>
        </span>
      </div>
    </div>
  );
};

export default Header;

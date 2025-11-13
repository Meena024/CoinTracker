import head_classes from "./UI/CSS/Header.module.css";
import logo from "../Assets/coin tracker.png";

const Header = () => {
  return (
    <div className={head_classes.head_dark}>
      <div className={head_classes.header}>
        <span style={{ paddingLeft: "2%" }}>
          <img src={logo} style={{ height: 100 }} alt="logo" />
        </span>
        <span
          style={{ paddingRight: "2%" }}
          className={head_classes.nowrap_text}
        >
          <h2>Welcome to COIN TRACKER!</h2>
          <h3 className="ms-4">Track it, Know it, Own it.</h3>
        </span>
      </div>
    </div>
  );
};

export default Header;

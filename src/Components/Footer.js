import head_classes from "./UI/CSS/Footer.module.css";
import logo from "../Assets/coin tracker.png";

const Footer = () => {
  return (
    <div className={head_classes.footer}>
      <span className="gap-10">
        <img src={logo} style={{ height: 50, marginRight: 20 }} alt="logo" />
        COIN TRACKER
      </span>
      <span>Track it, Know it, Own it.</span>
    </div>
  );
};

export default Footer;

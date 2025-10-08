import { useEffect } from "react";
import Main from "./Components/Main";
import WebFont from "webfontloader";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "Roboto",
          "Lato",
          "Open Sans",
          "Montserrat",
          "Poppins",
          "Merriweather",
          "Source Sans Pro",
          "Nunito",
          "Playfair Display",
          "Roboto Slab",
        ],
      },
    });
  }, []);
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;

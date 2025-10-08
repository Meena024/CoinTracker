import { useEffect } from "react";
import Main from "./Components/Main";
import WebFont from "webfontloader";

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
  return <Main />;
}

export default App;

import { useEffect } from "react";
import Main from "./Components/Main";
import WebFont from "webfontloader";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router";
import store from "./Components/Redux store/store";
import { Provider } from "react-redux";

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
      <Provider store={store}>
        <Main />
      </Provider>
    </BrowserRouter>
  );
}

export default App;

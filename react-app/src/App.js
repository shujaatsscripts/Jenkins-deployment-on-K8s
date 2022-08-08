import React from "react";
import theme from "./theme";
import { ThemeProvider } from "styled-components";
import Navigation from "./containers/Navigation";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </ThemeProvider>
  );
}

export default App;

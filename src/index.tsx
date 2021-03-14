import { ApolloProvider } from "@apollo/client";
import { jssPreset, StylesProvider, ThemeProvider } from "@material-ui/styles";
import { create } from "jss";
import camelCase from "jss-plugin-camel-case";
import compose from "jss-plugin-compose";
import defaultUnit from "jss-plugin-default-unit";
import extend from "jss-plugin-extend";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import ScrollElementTracker from "./components/ScrollElementTracker";
import client from "./graphql";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";

const jss = create({
  plugins: [
    ...jssPreset().plugins,
    extend(),
    compose(),
    camelCase(),
    defaultUnit(),
  ],
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <ScrollElementTracker>
          <App />
        </ScrollElementTracker>
      </ThemeProvider>
    </StylesProvider>
  </ApolloProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

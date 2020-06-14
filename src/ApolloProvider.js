import React from "react";
import App from "./App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "https://api.entur.io/journey-planner/v2/graphql",
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

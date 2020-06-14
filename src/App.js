import React, { useState, useEffect } from "react";
import { ROUTE_INFO } from "./service/API";
import { useQuery } from "@apollo/react-hooks";
import Departure from "./components/departure";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  width: 350px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  height: 50px;
  width: 100px;
`;

function App() {
  const { loading, error, data } = useQuery(ROUTE_INFO);
  if (loading) return <p>Loading..</p>;
  if (error) return <p>Could not get data</p>;

  return (
    <Container>
      <h1>Welcome To Commuter</h1>
      <h2>Stop: {data.stopPlace.name}</h2>

      {data.stopPlace.estimatedCalls.map((calls, index) => (
        <Departure data={calls} key={index} />
      ))}
    </Container>
  );
}

export default App;

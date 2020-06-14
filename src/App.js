import React, { useState, useEffect } from "react";
import { ROUTE_INFO } from "./service/API";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
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
  margin-top: 10px;
  height: 50px;
  width: 100px;
`;

function App() {
  const [queue, setQueue] = useState([]);
  const [currentFunction, setCurrentFunction] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { data, error, loading, refetch } = useQuery(ROUTE_INFO);

  useEffect(() => {
    FunctionHandler();
  }, [currentFunction]);

  const FunctionHandler = async () => {
    console.log("function handler");

    if (!isLoading && currentFunction) {
      setIsLoading(true);
      await new Promise((resolve) => {
        setTimeout(() => {
          debugger;
          currentFunction();
          resolve();
        }, 2000);
      }).then(() => {
        setCurrentFunction(undefined);
        setIsLoading(false);
      });
    }
  };

  if (!isLoading && queue.length && !currentFunction) {
    try {
      const temporaryQueue = [...queue];
      setCurrentFunction(temporaryQueue.pop());
      setQueue([]);
    } catch (e) {
      setIsLoading(false);
    }
  }

  const addToQueue = () => {
    if (!isLoading) {
      setCurrentFunction(() => refetch);
      console.log("Set current function");
    } else {
      console.log("add to queue");

      setQueue([...queue, () => refetch]);
    }
  };

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Container>
      <h1>Welcome To Commuter</h1>
      <h2>Stop: {data.stopPlace.name}</h2>

      {data.stopPlace.estimatedCalls.map((calls, index) => (
        <Departure data={calls} key={index} />
      ))}
      <Button onClick={() => addToQueue()}>Update</Button>
    </Container>
  );
}

export default App;

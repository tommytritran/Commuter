import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  padding: 5px;
  margin-top: 3px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ContainerLine = styled.div`
  width: 100%;
`;

const ContainerDeparture = styled.div`
  width: 100%;
  margin-left: 25px;
`;
const LineNumber = styled.div`
  width: 50px;
  display: flex;
  float: left;
  align-items: center;
  justify-content: center;
`;
const LineName = styled.div`
  display: flex;
  align-items: center;
`;

const DepartureTime = styled.div`
  display: flex;
`;
//Return only line number
const getLineNumber = (value) => {
  return value.substring("RUT:Line:".length);
};

const getAimedArrivalTime = (value) => {
  return new Date(value).toLocaleTimeString([], { timeStyle: "short" });
};
const getExpectedArrivalTime = (aimed, expected) => {
  const arrivalTime = getAimedArrivalTime(aimed);
  const aimedTime = new Date(aimed).getMinutes();
  const expectedTime = new Date(expected).getMinutes();
  const difference = Math.abs(expectedTime - aimedTime);
  return difference <= 0 ? (
    <DepartureTime>Avgang: {arrivalTime}</DepartureTime>
  ) : (
    <>
      <DepartureTime style={{ textDecoration: "line-through" }}>
        Forventet Avgang: {arrivalTime}
      </DepartureTime>
      <DepartureTime style={{ color: "#8c0000" }}>
        Forsinket avgang: {getAimedArrivalTime(expected)}
      </DepartureTime>
    </>
  );
};

const Departure = ({ data }) => {
  return (
    <Container>
      <ContainerLine>
        <LineNumber>
          {getLineNumber(data.serviceJourney.journeyPattern.line.id)}
        </LineNumber>
        <LineName>{data.serviceJourney.journeyPattern.line.name}</LineName>
      </ContainerLine>
      <ContainerDeparture>
        {getExpectedArrivalTime(
          data.aimedArrivalTime,
          data.expectedArrivalTime
        )}
      </ContainerDeparture>
    </Container>
  );
};

export default Departure;

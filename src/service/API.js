import { gql } from "apollo-boost";

const ROUTE_INFO = gql`{
    stopPlace(id: "NSR:StopPlace:4000") {
      id
      name
      estimatedCalls(startTime:"${new Date().toISOString()}" timeRange: 72100, numberOfDepartures: 10) {
        realtime
        aimedArrivalTime
        expectedArrivalTime
        date
        destinationDisplay {
          frontText
        }
        serviceJourney {
            journeyPattern {
              line {
                id
                name
                transportMode
              }
            }
          }
      }
    }
  }`;

export { ROUTE_INFO };

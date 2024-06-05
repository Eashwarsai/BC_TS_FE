import React from "react";
import { useFinishedEvents } from "../../constants/query/FetchQuery";
import EventDetails from "../EventDetails/EventDetails";
import { FinishedEvent } from "../../constants/TypesAndInterfaces";

const Finished : React.FC = () => {
  const { data, isLoading } = useFinishedEvents();
  console.log(data)
  if (isLoading) return <div>Loading</div>;
  return (
    <div>
      {data?.length === 0 ? <div>No events found</div> : data?.map((item:FinishedEvent) => {
        return (
            <div key={item.event_id} style={{marginBottom: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            padding: "20px"}}>
              <EventDetails  name={item.event_name} date={item.event_date} />
            </div>
        );
      })}
    </div>
  );
};

export default Finished;

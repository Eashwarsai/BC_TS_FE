import React from "react";
import { useFinishedEvents } from "../constants/query/FetchQuery";
import Charts from "./Charts/Charts";

const Analytics : React.FC = () => {
  const { data, isLoading } = useFinishedEvents();
  
  if (isLoading) {
    return <>loading</>;
  }
  if(data)
  {
    return (
      <Charts data={data}/>
    );
  }
};

export default Analytics;

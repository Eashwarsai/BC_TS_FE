import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { FinishedEvent } from "../../constants/TypesAndInterfaces";

export default function Charts({ data } : {data : FinishedEvent[]}) {  
  const upvotes : number[] = [];
  const downvotes : number[] = [];
  const names : string[]= [];
  const categories : { [key: string]: number } = {};
  const events : FinishedEvent[] = data;
  console.log(events);
  // if (!Array.isArray(events)) {
  //   console.error('Expected events to be an array but got', typeof events);
  //   return null; // or handle the error appropriately
  // }
  events?.forEach((event : FinishedEvent) => {
    const category = event.suggestions[0].category;
    names.push(event?.event_name);
    upvotes.push(event.suggestions[0].upvote_count);
    downvotes.push(event.suggestions[0].downvote_count);
    if (categories[category]) categories[category]++;
    else categories[category] = 1;
  });
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          height: "50%",
        }}
      >
        <h3>upvotes and downvotes based on availability</h3>
        <BarChart
          height={300}
          sx={{ flex: 1 }}
          series={[
            { data: upvotes, label: "upvotes", id: "uvId" },
            { data: downvotes, label: "downvotes", id: "dvId" },
          ]}
          xAxis={[{ data: names, scaleType: "band" }]}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
          height: "50%",
        }}
      >
        <h3>Overall representation of categories of Events </h3>
        <PieChart
          style={{ flex: 1 }}
          series={[
            {
              data: Object.keys(categories).map((category, index) => {
                return {
                  id: index,
                  value: categories[category],
                  label: category,
                };
              }),
            },
          ]}
          height={300}
        />
      </div>
    </div>
  );
}

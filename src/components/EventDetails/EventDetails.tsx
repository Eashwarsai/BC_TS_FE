import React from "react";
import './EventDetails.css'
const EventDetails = ({ name, date } : { name: string, date: string }) => {
  return (
    <div className="container">
      <h1 className="name">{name}</h1>
      <h2 className="date">{new Date(date.replace(' ', 'T')).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}</h2>
    </div>
  );
};

export default EventDetails;

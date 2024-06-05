import React from "react";
import { Route, Routes } from "react-router-dom";
import Finished from "./Events/FinishedEvents";
import Freezed from "./Events/FreezedEvents";
import Current from "./Events/CurrentEvents";
import Home from "./Home";
import Analytics from "./Analytics";
import Admin from "./Admin/Admin";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/home">
        <Route path="finished" element={<Finished />} />
        <Route path="freezed" element={<Freezed />} />
        <Route path="current" element={<Current />} />z
        <Route index element={<Home />} />
      </Route>
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default AllRoutes;

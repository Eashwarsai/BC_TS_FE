import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement?? document.body);
root.render(
  <BrowserRouter>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </UserProvider>
  </BrowserRouter>
);

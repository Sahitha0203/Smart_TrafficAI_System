import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate, // 1. Import Navigate
} from "react-router-dom";
import Heading from "./components/Heading";
import Body from "./components/Body";
import About from "./components/About";
import Dashboard from "./components/Dashboard";

// ... Your Layout component is fine ...
const Layout = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Heading />
      <Outlet />
    </div>
  );
};

const App = () => (
  <Routes>
    {/* Wrap all pages inside Layout so Heading stays visible */}
    <Route path="/" element={<Layout />}>
      {/* 2. Change this line */}
      <Route index element={<Navigate to="/home" replace />} />

      {/* 3. Your other routes are perfect */}
      <Route path="home" element={<Body />} />
      <Route path="about" element={<About />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  </Routes>
);

// ... Your root.render is fine ...
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

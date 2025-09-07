import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

export default function FrontLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

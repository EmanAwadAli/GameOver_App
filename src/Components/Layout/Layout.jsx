import React from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";

export default function Layout({ user, setUser }) {
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Outlet />
    </>
  );
}

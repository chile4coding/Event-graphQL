import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./MainNvigation.css";
export default function Layout({ children }) {
  return (
    <div className=" layout">
      <header className="main-navigation">
        <div className="main-navigation__logo">
          <h1>EasyEvents</h1>
        </div>

        <nav className="main-navigation__items">
          <ul>
            <li>
              <NavLink to="/auth">Auth</NavLink>
            </li>
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
            <li>
              <NavLink to="/bookings">Bookings</NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </header>
      <main className="children-layout">{children}</main>
      <Outlet />
    </div>
  );
}

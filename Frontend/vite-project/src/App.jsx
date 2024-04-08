import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Event";
import BookingsPage from "./pages/Bookings";
import MainNavigation from "./components/Navigation/MainNavigation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route index path="/auth" element={<AuthPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

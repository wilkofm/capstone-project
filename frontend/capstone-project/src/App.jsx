import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import WatchlistPage from "./pages/WatchlistPage";
import CreateAccountForm from "./components/CreateAccountForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/mylist" element={<WatchlistPage />} />
        <Route path="/create-account" element={<CreateAccountForm />} />
      </Routes>
    </Router>
  );
}

export default App;

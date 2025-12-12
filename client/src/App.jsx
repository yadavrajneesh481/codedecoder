import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./Protectedroute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CodeExplainer from "./pages/CodeExplainer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/codeexplainer" element={
          <ProtectedRoute>
            <CodeExplainer />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

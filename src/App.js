import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import SignupForm from "./components/SignupForm";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SignupForm />} />
      </Routes>
    </HashRouter>
  );
}

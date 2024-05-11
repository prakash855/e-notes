import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./home";
import SignupForm from "./pages/auth/signup";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupForm />} />
    </Routes>
  );
};

export default App;

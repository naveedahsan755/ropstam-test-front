import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

import Protected from "./components/Protected";
import Main from "./components/Main";
import NotFount from "./components/NotFount";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route path="*" element={<NotFount />} />
    </Routes>
  );
}

export default App;

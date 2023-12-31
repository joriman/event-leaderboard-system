import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard";

import ParticipantView from "./components/participants/ParticipantView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/participant/:id" element={<ParticipantView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
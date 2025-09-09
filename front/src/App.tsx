import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages";
import DashboardPage from "./pages/dashboard";
import NotFoundPage from "./pages/not-found";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

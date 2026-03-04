import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ThemeProvider } from "@/react-app/contexts/ThemeContext";
import LandingPage from "@/react-app/pages/LandingPage";
import Dashboard from "@/react-app/pages/Dashboard";
import TextDetector from "@/react-app/pages/TextDetector";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detector/text" element={<TextDetector />} />
          <Route path="/profile-setup" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

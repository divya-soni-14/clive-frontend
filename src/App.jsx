import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import ConversationWindow from "./components/ConversationWindow";
// import ResultsPage from "./components/ResultsPage"; // Placeholder for a new page

// App component with Router
function App() {
  return (
    <Router>
      <div className=" w-screen flex flex-col items-center font-sans box-border">
        {/* Header */}
        <Header />
        <main className="flex-grow overflow-y-hidden">
          {/* Main Content with Routes */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/conversation/:sessionId" element={<ConversationWindow />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

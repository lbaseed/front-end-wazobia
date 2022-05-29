// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardPage from "./pages/dashboard";
import CreatAccount from "./pages/creatAccount";
import LoginUser from "./pages/login";
import CompleteVerification from "./pages/completeVerification";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/signup" element={<CreatAccount />} />
          <Route
            path="/email/verify/:vtoken"
            element={<CompleteVerification />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

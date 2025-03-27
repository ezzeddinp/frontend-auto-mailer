import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useStore } from "./store/useStore";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import History from "./pages/History";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./components/ThemeContext";

function App() {
  // const { token, setToken } = useStore();
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Ambil dari localStorage, default false (light mode)
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // useEffect(() => {
  //   // Mock token login
  //   if (!token) {
  //     setToken("mock-token-123");
  //   }
  // }, [setToken, token]);

  useEffect(() => {
    // Simpan darkMode ke localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    // Update class di <html> (opsional, tapi bantu kalau Tailwind ga deteksi class dark di root div)
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <ThemeProvider>
      <div className={darkMode ? "dark" : "light"}>
        <Router>
          <div className="flex min-h-screen bg-white dark:bg-bg-dark">
            <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
            <div className="flex-1 p-6">
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
            </div>

            {/* <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg dark:text-white">Loading...</p>
              </div> */}
          </div>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme={darkMode ? "dark" : "light"}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

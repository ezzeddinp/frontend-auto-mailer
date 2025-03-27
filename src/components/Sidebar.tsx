import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useStore } from "../store/useStore";

interface SidebarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode, setDarkMode }) => {
  const { setToken } = useStore();
  const navigate = useNavigate();
  const location = useLocation(); // Gunain useLocation buat cek path aktif

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  // Fungsi buat cek apakah path aktif
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-[#10A3E9] text-gray-800 dark:text-white flex flex-col justify-between p-4">
      <div>
        <h2 className="text-xl font-bold mb-6">Auto Mailer</h2>
        <nav>
          <ul className="space-y-4">
            <li
              className={`transition-all duration-300 flex w-full px-4 py-2 rounded-[7px] ${
                isActive("/home") ? "bg-[#0274AB]" : ""
              }`}
            >
              <Link to="/home" className=" flex w-full">
                Home
              </Link>
            </li>
            <li
              className={`transition-all duration-300  px-4 py-2 rounded-[7px] ${
                isActive("/history") ? "bg-[#0274AB]" : ""
              }`}
            >
              <Link to="/history" className="flex w-full">
                History
              </Link>
            </li>
            <li
              className={`transition-all duration-300  px-4 py-2 rounded-[7px] ${
                isActive("/profile") ? "bg-[#0274AB]" : ""
              }`}
            >
              <Link to="/profile" className=" flex w-full">
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="space-y-4">
        {/* Tombol Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center space-x-2"
        >
          {darkMode ? <Sun /> : <Moon />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
        {/* Hapus ThemeToggle karena udah ada tombol dark mode manual */}
        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
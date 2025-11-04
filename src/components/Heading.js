import { LOGO_URL } from "../../utils/constant";
import { useState } from "react";
import { Link } from "react-router-dom";

const Heading = () => {
  const [btnName, setBtnName] = useState("Login");

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-white shadow-md px-6 py-3 h-20">
      {/* Logo */}
      <div className="flex items-center">
        <img src={LOGO_URL} alt="Logo" className="w-10 h-10 mr-2" />
        <h1 className="text-xl font-bold text-gray-800">TrafficAI</h1>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex items-center gap-6 text-gray-800 font-medium">
          <li>
            <Link to="/home" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/map-view"
              className="hover:text-blue-600 transition-colors"
            >
              Map view
            </Link>
          </li>
          <li>
            <Link
              to="/upload"
              className="hover:text-blue-600 transition-colors"
            >
              Upload
            </Link>
          </li>
          <li>
            <button
              onClick={() =>
                setBtnName((prev) => (prev === "Login" ? "Logout" : "Login"))
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-all"
            >
              {btnName}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Heading;

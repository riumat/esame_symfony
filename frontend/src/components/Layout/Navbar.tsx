import React from "react";
import { Link, useNavigate } from "react-router";
import { removeToken } from "../../libs/storage";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    navigate("/login", { replace: true });
  };
  return (
    <nav className=" bg-gradient-to-l from-chart-5/20 to-chart-1/20 shadow-md sticky top-0 z-50 backdrop-blur-xl">
      <ul className="ml-20 gap-10 flex justify-start items-center p-4 text-base  text-black">
        <div className="font-bold italic tracking-wider mr-10">
          MyVideogameTrack
        </div>
        <li>
          <Link className="hover:underline duration-300 px-5 py-2" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="hover:underline duration-300 px-5 py-2" to="/user">
            La mia lista
          </Link>
        </li>
        <li>
          <button
            className="hover:underline duration-300 px-5 py-2"
            onClick={handleLogout}
          >
            Esci
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

import React, { useContext } from "react";
// import Logo from "../images/logo.png";
// import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar2 = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="bg-slate-600 h-16 w-full">
      <label className="text-white leading-[80px] uppercase md:leadind-[80px] pl-12 md:pl-24 md:text-4xl text-3xl">
      <a href="/" className="cursor-pointer">{currentUser?.username} Blog </a>
      </label>
      <input type="checkbox" id="check" hidden />
      <label
        htmlFor="check"
        className="float-right text-3xl text-white leading-[80px] mr-10 lg:hidden"
      >
        <FontAwesomeIcon icon={faBars} />
      </label>
      <ul className="float-right mr-10 lg:flex leading-[80px] space-x-4 text-black uppercase rounded fixed lg:relative h-[100vh] lg:h-0 w-[100%] lg:w-fit top-20 lg:top-0 left-[-100%] lg:left-0 transition-all duration-300 lg:transition-none text-center bg-slate-700 ] ">
        <li>
          <a href="/?cat=art"> Art</a>
        </li>
        <li>
          <a href="/?cat=science"> Science</a>
        </li>
        <li>
          <a href="/?cat=technology"> Technology</a>
        </li>
        <li>
          <a href="/?cat=cinema"> Cinema</a>
        </li>
        <li>
          <a href="/?cat=design"> Design</a>
        </li>
        <li>
          <a href="/?cat=food"> Food</a>
        </li>
        
        <li>
          <span className="font-medium text-black ">
            <a href="/write" className="bg-white">Post</a>
          </span>
        </li>
        <li>
          {currentUser ? (
            <span
              className="cursor-pointer max-w-max mb-2 px-4 py-2 border  text-black hover:bg-white hover:text-black"
              onClick={logout}
            >
              Logout
            </span>
          ) : (
            <a
              className="cursor-pointer max-w-max mb-2 px-4 py-2 border  text-black hover:bg-white hover:text-black"
              href="/login"
            >
              Login
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar2;

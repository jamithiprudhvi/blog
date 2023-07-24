import React from "react";
import Logo from "../images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-300">
      <div className="flex justify-between items-center m-2  p-1">
        <img src={Logo} alt="logo" className="w-20" />
        <span>Made by Manikanta</span>
      </div>
    </footer>
  );
};

export default Footer;

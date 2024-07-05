import React from "react";
import Logo1 from "../assets/Logo1.png";
const HeaderWelcoming = () => {
  return (
    <header className="w-full h-10 flex justify-center items-center px-16 py-2 sticky shadow-lg top-0 bg-[#CDF5FD] z-10">
      {/* Logo */}
      <div className="w-28 ">
        <img src={Logo1} alt="Logo" className="w-full h-full" />
      </div>
    </header>
  );
};

export default HeaderWelcoming;

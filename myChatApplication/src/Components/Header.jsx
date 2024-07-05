import React, { useState, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Services/firebase";
import { FaSignOutAlt } from "react-icons/fa";
import ConfirmationBox from "../Reusable/ConfirmationBox";
import Logo1 from "../assets/Logo1.png";

const Header = () => {
  const [user] = useAuthState(auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [defaultProfilePic, setDefaultProfilePic] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const signOut = () => {
    auth.signOut();
  };

  const handleSignOutClick = () => {
    setShowConfirmBox(true);
  };

  const handleConfirmSignOut = () => {
    signOut();
    setShowConfirmBox(false);
  };

  const handleCancelSignOut = () => {
    setShowConfirmBox(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  //UseEffect to set a default picture if user?.photoURL fails
  useEffect(() => {
    if (user) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = 100;
      canvas.height = 100;

      // Background color
      context.fillStyle = "#000000";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Text
      context.fillStyle = "#FFFFFF";
      context.font = "50px Arial";
      context.textAlign = "center";
      context.textBaseline = "middle";
      const firstLetter = user.displayName ? user.displayName[0] : "?";
      context.fillText(firstLetter, canvas.width / 2, canvas.height / 2);

      setDefaultProfilePic(canvas.toDataURL());
    }
  }, [user]);

  return (
    <header className="w-full h-16 flex justify-between items-center px-8 py-2 sticky shadow-lg top-0 bg-white z-10">
      {/* Logo */}
      <div className="w-28 ">
        <img src={Logo1} alt="Logo" className="w-full h-full" />
      </div>
      {/* Logged-in User Image */}
      <div className="relative">
        <img
          onClick={toggleDropdown}
          src={user?.photoURL || defaultProfilePic}
          alt="GoogleProfilePic"
          className="w-10 h-10 rounded-full cursor-pointer"
          onError={(e) => {
            e.target.onerror = null; // Prevents infinite loop if default image fails
            e.target.src = defaultProfilePic; // Fallback image
          }}
        />
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
          >
            <button
              onClick={handleSignOutClick}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaSignOutAlt className="mr-2" />
              Sign Out
            </button>
          </div>
        )}
      </div>
      {showConfirmBox && (
        <ConfirmationBox
          message="Are you sure you want to sign out?"
          onConfirm={handleConfirmSignOut}
          onCancel={handleCancelSignOut}
        />
      )}
    </header>
  );
};

export default Header;

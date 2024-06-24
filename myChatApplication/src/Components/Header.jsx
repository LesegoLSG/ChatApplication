import React, { useState, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Services/firebase";
import { FaSignOutAlt } from "react-icons/fa";
import ConfirmationBox from "../Reusable/ConfirmationBox";

const Header = () => {
  const [user] = useAuthState(auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
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

  return (
    <header className="w-full h-16 flex justify-between items-center px-16 py-2 sticky shadow-lg top-0 bg-white z-10">
      {/* Logo */}
      <div>
        <h1 className="text-lg font-bold">Less-Ego</h1>
      </div>
      {/* Logged-in User Image */}
      <div className="relative">
        <img
          onClick={toggleDropdown}
          src={user?.photoURL}
          alt="GoogleProfilePic"
          className="w-10 h-10 rounded-full cursor-pointer"
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

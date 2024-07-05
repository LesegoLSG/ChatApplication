import React, { useState, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Services/firebase";
import { FaSignOutAlt } from "react-icons/fa";
import ConfirmationBox from "../Reusable/ConfirmationBox";
import Logo1 from "../assets/Logo1.png";

const Header = () => {
  const [user] = useAuthState(auth); //Get the current authenticated user

  const [dropdownOpen, setDropdownOpen] = useState(false); //State to track dropdown visibility
  const [showConfirmBox, setShowConfirmBox] = useState(false); //State to track confirmation box visibility
  const [defaultProfilePic, setDefaultProfilePic] = useState(null); //State to store default profile picture
  const dropdownRef = useRef(null); //Reference for the dropdown menu

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Sign out the user
  const signOut = () => {
    auth.signOut();
  };

  // Handle sign-out button click
  const handleSignOutClick = () => {
    setShowConfirmBox(true);
  };

  // Confirm sign-out
  const handleConfirmSignOut = () => {
    signOut();
    setShowConfirmBox(false);
  };

  // Cancel sign-out
  const handleCancelSignOut = () => {
    setShowConfirmBox(false);
  };

  // Close dropdown when clicking outside
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

  // Set a default profile picture if user's photoURL is unavailable
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

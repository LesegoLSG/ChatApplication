import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Services/firebase";

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <header className="w-full h-16 flex justify-between items-center px-6 py-2 sticky shadow-lg top-0 bg-white z-10">
      {/* Logo */}
      <div>
        <h1 className="text-lg font-bold">Less-Ego</h1>
      </div>
      {/*Loggedin User Image */}
      <div>
        <img
          onClick={() => auth.signOut()}
          src={user?.photoURL}
          alt="GoogleProfilePic"
          className="w-10 h-10 rounded-full cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;

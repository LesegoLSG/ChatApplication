import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Services/firebase";

const LoginPage = () => {
  const signInUser = () => {
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold italic ">Less-Ego</h1>
      <button
        onClick={signInUser}
        className="px-4 py-2 my-6 bg-blue-200 rounded font-bold"
      >
        Sign in with Google
      </button>
    </section>
  );
};

export default LoginPage;

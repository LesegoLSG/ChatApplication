import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Services/firebase";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const signInUser = () => {
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };

  return (
    <section
      className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1513463138/photo/feedback-concept-user-comment-rating-online-writing-feedback-review.jpg?s=2048x2048&w=is&k=20&c=49lu9Az2d35ktH_ioUYoxbmuqHq-C80CeepCs8tuTNo=')",
      }}
    >
      <div className="bg-white bg-opacity-70 p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-extrabold  text-gray-900 mb-8">
          Welcome <br /> to <br /> Less-Ego Chat
        </h1>
        <button
          onClick={signInUser}
          className="flex items-center px-6 py-3 mt-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow-md transition duration-300"
        >
          <FaGoogle className="mr-3" />
          Sign in with Google
        </button>
      </div>
    </section>
  );
};

export default LoginPage;

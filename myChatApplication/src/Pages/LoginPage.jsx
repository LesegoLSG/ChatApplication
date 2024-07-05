import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Services/firebase";
import { FaGoogle } from "react-icons/fa";
import Lottie from "react-lottie";
import HomeAnimation from "../assets/Animation/HomeAnimation.json"; // Make sure to replace with the correct path to your animation file
import HeaderWelcoming from "../Components/HeaderWelcoming";
import { motion } from "framer-motion";

const LoginPage = () => {
  // Function to handle user sign-in with Google
  const signInUser = () => {
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };

  // Options for the Lottie animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: HomeAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section className="w-full flex flex-col  items-center  min-h-screen pb-16 bg-gradient-to-r from-[#A0E9FF] to-[#89CFF3]">
      <HeaderWelcoming />
      <div className="w-full h-auto flex flex-col md:flex-row items-center justify-center text-center py-16">
        {/* Heading and sub-heading*/}
        <div className="w-full md:w-1/2 px-4 md:px-8">
          <motion.h1
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1, transition: { duration: 0.5 } }}
            className="text-5xl text-gray-500 font-bold mb-4"
          >
            Chat
            <span className="text-white">Hive</span>
          </motion.h1>
          <motion.h3
            initial={{ x: 50 }}
            whileInView={{ x: 0, transition: { duration: 1 } }}
            className="text-xl font-bold"
          >
            Your Ultimate Group Chat Experience
          </motion.h3>

          <motion.p
            initial={{ x: -50 }}
            whileInView={{ x: 0, transition: { duration: 1 } }}
            className="text-xl text-gray-600 py-1"
          >
            ChatHive is the perfect place to stay connected with your friends,
            family, and colleagues. Enjoy seamless group conversations, share
            moments instantly, and never miss out on what's important. Dive into
            lively discussions, send messages effortlessly, and experience a new
            level of social interaction with ChatHive. Join the hive and keep
            the buzz alive!
          </motion.p>
        </div>

        {/* Lottie animation */}
        <motion.div
          initial={{ y: 100 }}
          whileInView={{ y: 0, transition: { duration: 1 } }}
          className="w-full md:w-1/2 mb-8"
        >
          <Lottie options={defaultOptions} />
        </motion.div>
      </div>
      {/* Notification message */}
      <div className="w-full md:w-1/2 px-4 md:px-8 mb-4">
        <p className="text-red-500 font-bold">
          Please note: This application is public. Anyone with a Gmail account
          can access any of the messages sent.
        </p>
      </div>
      {/* Sign in button */}
      <button
        onClick={signInUser}
        className="bg-[#00A9FF] text-white p-4 rounded-lg flex items-center hover:bg-blue-600 transition duration-300"
      >
        <FaGoogle className="mr-2" />
        Sign in with Google
      </button>
    </section>
  );
};

export default LoginPage;

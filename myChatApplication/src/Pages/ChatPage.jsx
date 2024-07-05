import React, { useEffect, useRef, useState } from "react";
import Header from "../Components/Header";
import Message from "../Components/Message";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Services/firebase";
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import FlipMove from "react-flip-move";
import { FiSend } from "react-icons/fi";

const ChatPage = () => {
  // State to manage the input field
  const [input, setInput] = useState("");

  // Getting the current user from Firebase Auth
  const [user] = useAuthState(auth);

  // Reference to the last message element
  const lastMessage = useRef(null);

  // Function to send a message
  const sendMessage = (e) => {
    e.preventDefault();
    addDoc(collection(db, "chats"), {
      sender: user?.displayName, //The name of the sender
      message: input, // The message text
      time: serverTimestamp(),
    })
      .then(() => {
        setInput("");
        scrollToBottom(); // Scroll to the bottom of the messages
      })
      .catch((error) => alert(error.message));
  };

  // Hook to get the collection of messages from Firestore, ordered by time
  const [messages, loading] = useCollection(
    query(collection(db, "chats"), orderBy("time", "asc"))
  );

  // Function to scroll to the bottom of the messages
  const scrollToBottom = () => {
    lastMessage.current.scrollIntoView({
      behaviour: "smooth",
    });
  };

  return (
    <section className="">
      {/* Header component */}
      <Header />

      {/* Body for chat page */}
      <div className="max-w-2xl min-h-screen mx-auto mt-2 bg-gray-200 shadow-lg rounded-lg">
        {/* messages */}
        <div className="p-5 ">
          <FlipMove>
            {/* Mapping through the messages and rendering each one */}
            {messages?.docs?.map((message) => (
              <Message
                key={message.id}
                sender={message.data().sender}
                message={message.data().message}
                time={message
                  ?.data()
                  ?.time?.toDate()
                  .toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" })}
              />
            ))}
          </FlipMove>

          <div ref={lastMessage} className="mb-12" />
        </div>
        {/* Input form */}
        <form
          className="fixed  bottom-2  w-96 flex justify-between items-center space-x-2 pr-8 pl-5 "
          onSubmit={sendMessage}
        >
          <input
            type="text"
            placeholder="Send Me A Text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 outline-none bg-gray-300 p-4 rounded-lg h-10"
          />
          {/* Submit button */}
          <button
            type="submit"
            disabled={!input}
            className="bg-green-400 h-10 flex justify-center items-center  px-6 py-4 rounded-lg font-bold
             disabled:bg-gray-300 disabled:cursor-not-allowed transform transition duration-200 hover:scale-110"
          >
            <FiSend />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChatPage;

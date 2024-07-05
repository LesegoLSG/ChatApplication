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
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const lastMessage = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    addDoc(collection(db, "chats"), {
      sender: user?.displayName,
      message: input,
      time: serverTimestamp(),
    })
      .then(() => {
        setInput("");
        scrollToBottom();
      })
      .catch((error) => alert(error.message));
  };

  const [messages, loading] = useCollection(
    query(collection(db, "chats"), orderBy("time", "asc"))
  );

  const scrollToBottom = () => {
    lastMessage.current.scrollIntoView({
      behaviour: "smooth",
    });
  };

  return (
    <section className="">
      <Header />

      {/* Body for chatpage */}
      <div className="max-w-2xl min-h-screen mx-auto mt-2 bg-gray-200 shadow-lg rounded-lg">
        {/* messages */}
        <div className="p-5 ">
          <FlipMove>
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
        {/* Input */}
        <form
          className="fixed  bottom-2  w-96 flex justify-between items-center space-x-2 pr-8 pl-5 "
          onSubmit={sendMessage}
        >
          {/* <div className="w-full bg-blue-600"> */}
          <input
            type="text"
            placeholder="Send Me A Text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 outline-none bg-gray-300 p-4 rounded-lg h-10"
          />
          <button
            type="submit"
            disabled={!input}
            className="bg-green-400 h-10 flex justify-center items-center  px-6 py-4 rounded-lg font-bold
             disabled:bg-gray-300 disabled:cursor-not-allowed transform transition duration-200 hover:scale-110"
            // onClick={sendMessage}
          >
            <FiSend />
          </button>
          {/* </div> */}
        </form>
      </div>
    </section>
  );
};

export default ChatPage;

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
// import { data } from "autoprefixer";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const lastMessage = useRef(null);

  const sendMessage = () => {
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
      <div className="max-w-2xl mx-auto mt-2 bg-gray-200 shadow-lg rounded-lg">
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
        <div className="fixed  bottom-2  w-96 flex justify-between items-center space-x-2 ">
          {/* <div className="w-full bg-blue-600"> */}
          <input
            type="text"
            placeholder="Send Me A Text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 outline-none bg-gray-300 p-4 rounded-lg"
          />
          <button
            disabled={!input}
            className="bg-blue-200  px-6 py-4 rounded-lg font-bold disabled:bg-gray-200 disabled:cursor-not-allowed"
            onClick={sendMessage}
          >
            Send
          </button>
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export default ChatPage;

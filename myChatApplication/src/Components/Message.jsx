import React, { forwardRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Services/firebase";

// ForwardRef used to pass refs down to child components
const Message = forwardRef(({ sender, message, time }, ref) => {
  // Get the current authenticated user
  const [user] = useAuthState(auth);

  return (
    // Apply different styles based on whether the message was sent by the current user
    <div
      ref={ref}
      className={`${
        sender === user?.displayName
          ? "relative w-fit bg-[#89CFF3] p-2 rounded-lg ml-auto mt-6 min-w-[200px] rounded-tr-none"
          : "relative w-fit bg-gray-300 p-2 rounded-lg mt-6 min-w-[200px] rounded-tl-none"
      } `}
    >
      {/* Display the sender's name */}
      <p className="text-xs font-semibold absolute -top-5">{sender}</p>
      {/* Display the message content */}
      <p>{message}</p>
      {/* Display the time the message was sent */}
      <p className="text-xs text-right text-gray-800">{time}</p>
      {console.log("time:", time)}
    </div>
  );
});

export default Message;

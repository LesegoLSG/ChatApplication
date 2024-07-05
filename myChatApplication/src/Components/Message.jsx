import React, { forwardRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Services/firebase";

const Message = forwardRef(({ sender, message, time }, ref) => {
  const [user] = useAuthState(auth);
  return (
    <div
      ref={ref}
      className={`${
        sender === user?.displayName
          ? "relative w-fit bg-[#89CFF3] p-2 rounded-lg ml-auto mt-6 min-w-[200px] rounded-tr-none"
          : "relative w-fit bg-gray-300 p-2 rounded-lg mt-6 min-w-[200px] rounded-tl-none"
      } `}
    >
      <p className="text-xs font-semibold absolute -top-5">{sender}</p>
      {console.log("sender:", sender)}
      <p>{message}</p>
      {console.log("Message:", message)}

      <p className="text-xs text-right text-gray-800">{time}</p>
      {console.log("time:", time)}
    </div>
  );
});

export default Message;

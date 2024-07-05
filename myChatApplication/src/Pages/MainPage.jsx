import React from "react";
import LoginPage from "./LoginPage";
import ChatPage from "./ChatPage";
import { auth } from "../Services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoaderModal from "../Reusable/LoaderModal";

const MainPage = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <LoaderModal />;
  }

  if (error) {
    console.error("Authentication error:", error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {console.log("User: ", user)}
      {user == null ? <LoginPage /> : <ChatPage />}
    </div>
  );
};

export default MainPage;

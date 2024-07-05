import React from "react";
import LoginPage from "./LoginPage";
import ChatPage from "./ChatPage";
import { auth } from "../Services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoaderModal from "../Reusable/LoaderModal";

const MainPage = () => {
  // Use the Firebase authentication state hook to get the user, loading state, and error state
  const [user, loading, error] = useAuthState(auth);

  // If the authentication state is loading, show a loading modal
  if (loading) {
    return <LoaderModal />;
  }

  // If there is an authentication error, log it and display an error message
  if (error) {
    console.error("Authentication error:", error);
    return <p>Error: {error.message}</p>;
  }
  // Render the main content: show the LoginPage if the user is not authenticated, otherwise show the ChatPage
  return (
    <div>
      {console.log("User: ", user)}
      {user == null ? <LoginPage /> : <ChatPage />}
    </div>
  );
};

export default MainPage;

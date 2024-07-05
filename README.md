# ChatHive

ChatHive is a real-time chat application that allows users with a Google account to seamlessly connect and communicate. Utilizing Firebase for authentication and database storage, ChatHive ensures a secure and efficient messaging experience.

## Table of contents
* Introduction
* Features
* Usage
* Challenges
* How to run this project
* Technologies used
* Live Demo
* contributions
* License

## Introduction

ChatHive is designed to provide a smooth and interactive group chat experience. With easy Google authentication, users can join the chat, send messages, and view messages from others in real-time. This application is perfect for staying connected with friends, family, and colleagues.

## Features

- **Google Authentication**: Secure login with Google accounts using Firebase Authentication.
- **Real-Time Messaging**: Instant message updates stored and retrieved from Firebase Firestore.
- **User Interface**:
  - **Login Page**: Includes application name, description, and a "Sign in with Google" button.
  - **Chat Page**: Displays a header with the user’s initial, a dropdown menu for signing out, and a chat section with messages.
- **Responsive Design**: Messages are displayed on the left for other users and on the right for the logged-in user.
- **Message Details**: Each message includes the sender's name, the message content, and the date and time it was sent.
- **Sign Out**: Option to sign out with a confirmation prompt.

## Usage

1. **Login**: Users log in using their Google account through Firebase Authentication.
2. **Chat**: Once logged in, users can send and receive messages in real-time.
3. **Sign Out**: Users can sign out using the dropdown menu in the header, which prompts for confirmation.

## Challenges

- **Authentication Handling**: Ensuring secure and smooth authentication with Firebase.
- **Real-Time Database Sync**: Keeping the chat data in sync in real-time for all users.
- **Responsive UI**: Designing a responsive user interface that works well on different devices and screen sizes.
- **Error Handling**: Properly handling errors and edge cases, such as network issues or authentication failures.

## How To Run The project
1. **Clone the repository**: Clone this repository to your local machine using the following command:
```
git Clone https://github.com/LesegoLSG/ChatApplication.git
```
2. **Import project** : After cloning, import the cloned project to your preferred IDE (I used visual studio to develop this project).
3. **Navigate to the project directory:** : Now make sure you are on the 'myChatApplication' directory.
````
cd myChatApplication
````
4. **Install dependencies** : This project makes use of Node js.
````
npm install or yarn install
````
5. **Start the server** :Start the server using the following command:
```
npm run dev
```

## Live demo
```
https:// to be provided
```

## Technologies Used

- **React**: Frontend library for building the user interface.
- **Firebase**: Backend services including Authentication and Firestore.
- **Framer Motion**: Library for animations.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Lottie**: Library for rendering animations.

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch ( **git checkout -b feature** )
3. Make your changes and commit them (**git commit -am 'Add new feature'**)
4. Push to the branch (**git push origin feature**)
5. Create a pull request

## License
This project is a personal portfolio project and is not intended for commercial use or distribution. All rights reserved by the author.

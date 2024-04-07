# Job interview chatbot

## Introduction

Job Interview Chatbot is a powerful web application built with React and Vite. It leverages the speed and efficiency of Vite's modern build tooling along with React's robust library for building user interfaces. The purpose of this application is to create an interactive platform for conducting job interviews in a simulated chat environment using prompt engineering as the main tool. This tool uses OpenAI's API for generating messages, providing a fast and easy way to prepare for job interviews. This application was developed as a semester project for Prompt Engineering course at Budapest University of Technology and Economics (BME).

## React + Vite

This project uses React and Vite for frontend development.

### React

React is a popular JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience. It allows you to create reusable UI components, manage component state, and handle user events, among other features.

React uses a virtual DOM to improve performance. Instead of updating the entire page every time there is a change, React updates only the components that need to be updated. This makes React particularly well-suited for applications where the UI changes frequently.

### Vite

Vite is a modern front-end build tool created by Evan You, the creator of Vue.js. It offers a faster and leaner development experience for modern web projects. Vite improves the development experience in a number of ways:

-  **Fast Hot Module Replacement (HMR)**: Vite provides lightning-fast HMR because it doesn't need to bundle your entire app every time you make a change. It only needs to update the single file you've changed.

-  **Out-of-the-box ES6+ support**: Vite supports modern JavaScript out of the box. You can use ES6+ features without having to set up Babel.

-  **Optimized builds**: Vite uses Rollup for its production builds, which results in smaller, more efficient bundles compared to webpack-based tools.

### Powerful Combination

React and Vite together make for a powerful combination. React's efficient methods for creating and managing UI components pair well with Vite's fast HMR and modern JavaScript support. This results in a development experience that is both powerful and enjoyable.

Two official plugins are used for Fast Refresh:

-  [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-  [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

These plugins provide a near-instant feedback loop during development by preserving component state and only re-rendering the components that have changed when you save a file. This makes the development process smoother and more efficient.

## Key Features

This application has several key features that provide a robust and interactive platform for conducting job interviews in a simulated chat environment.

### Authentication with Firebase

User authentication is a key feature of this application. It allows users to create an account, log in, and manage their session. This is implemented using Firebase Authentication.

Firebase Authentication provides a full-featured, token-based authentication system for your application, with support for email and password authentication, Google Sign-In, and more. It integrates with other Firebase services, and it's easy to use with React thanks to libraries like React Firebase Hooks.

### Database Management with MongoDB

MongoDB is used as the database for this project. It is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.

MongoDB is particularly well-suited for storing the chat messages and user information for this application. Its flexible schema allows for easy changes as the application evolves, and its performance and scalability features ensure that the application can handle a large number of users and messages.

### Chat Functionality

The chat functionality is one of the core features of this application. It allows users to conduct job interviews in a simulated chat environment. The chat messages are stored in MongoDB and retrieved in real-time, providing a seamless and interactive user experience.

### User and Chat Management

The application provides features for managing users and chats. Administrators can view and manage users, including changing user roles and permissions. They can also view and manage chats, including viewing chat history and deleting chats.

These features are implemented using a combination of Firebase Authentication (for user management) and MongoDB (for chat management).

## Getting Started

To get started with the application, follow these steps:

1. **Create an Account**: Click on the "Sign Up" button on the home page. You will be redirected to a sign-up form. Fill in your email, password, and confirm your password, then click the "Sign Up" button to create your account.

2. **Log In**: If you already have an account, click on the "Log In" button on the home page. Enter your email and password, then click the "Log In" button to access your account.

3. **Start a New Chat**: Once you're logged in, you can start a new chat by clicking on the "New Chat" button. Enter the details of the chat, such as the title and participants, then click "Start Chat" to begin the conversation.

4. **Participate in a Chat**: In a chat, you can send messages by typing in the message box and pressing enter. You can also view the chat history by scrolling up in the chat window.

5. **Manage Chats and Users**: If you're an administrator, you can manage chats and users by clicking on the "Admin" button in the navigation bar. Here, you can view and manage users and chats.

Remember to log out when you're done using the application to ensure your account is secure.

## Tips for Efficient Use

-  **Use Keyboard Shortcuts**: You can press enter to send a message, and use the up and down arrow keys to navigate through your sent messages.

-  **Manage Your Chats**: If you're participating in multiple chats, remember to keep track of them. You can switch between chats by clicking on the chat title in the chat list.

-  **Secure Your Account**: Remember to use a strong, unique password for your account, and log out when you're done using the application.

## Credits

This application was created by István Kurucz, a student at Budapest University of Technology and Economics (BME). It was developed as a project for the Prompt Enginnering course.

The creator would like to express gratitude to the professors and teaching assistants of the Prompt Enginnering course for their guidance and support throughout the development of this project.

For any questions, suggestions, or feedback, please contact istvan.kurucz@edu.bme.hu.

Thank you for using my application!

# Chatbot Widget with Authentication and AI Integration

This project delivers a functional chatbot widget built using React and TypeScript, designed for embedding in external webpages. The backend is implemented with Xano, providing user authentication, refresh token logic, and integrations for AI services.

---

## Features

### Frontend
- **Chatbot Widget**: A lightweight and embeddable React component styled with CSS.
- **User Authentication**: Login and signup processes implemented using React Router.
- **Access Control**: Bot access is restricted to authenticated users, with sessions managed using tokens stored in React Context.

### Backend (Xano)
- **AI Integrations**:
    - Hugging Face (used as an alternative to OpenAI for free-tier support).
    - Assente AI API calls for processing chatbot queries.
- **User Authentication with Refresh Token Logic**:
    - Access tokens (`authToken`) and refresh tokens (`refreshToken`) for secure session management.
    - Refresh tokens stored in a database table linked to users.
    - Auth tokens have a short lifespan, with refresh tokens generating new auth tokens as needed.

---

## Token Refresh Mechanism

1. **Login** (`auth/login`):
    - Generates an `authToken` and `refreshToken`.
    - `refreshToken` is saved in a dedicated database table, linked to the `users` table.
    - `authToken` has a short lifespan (2 minutes initially).

2. **Token Refresh** (`auth/refresh_tokens`):
    - Request includes the `authToken` in the `Authorization` header.
    - Backend verifies the `refreshToken`:
        - If valid, a new pair of `authToken` (valid for a couple of hours) and `refreshToken` is generated.
    - Old refresh tokens in the database are replaced with the new pair.

3. **Frontend Update**:
    - The new tokens are sent to the frontend and stored in the Context API.

---

## Instructions

### Embedding the Chatbot Widget
To embed the chatbot widget on an external webpage:

1. **Install the package**:
   Include the chatbot widget package in your project dependencies:
   ```bash
   npm i chatbot_andrey_test
   ```

2. **Import and use the widget**:
   ```tsx
   import React from 'react';
   import { ChatbotWidget } from 'chatbot-widget';

   function App() {
     return (
       <div>
         <h1>Welcome to the Chatbot</h1>
         <ChatbotWidget />
       </div>
     );
   }

   export default App;
   ```

3. **Authentication Requirement**:
   Ensure the user is authenticated before displaying the chatbot.
   You can use `React.Context` to manage tokens and pass them as props to the chatbot component.

---

### Setting Up Xano Backend
1. **Create an Account and Workspace**:
    - Go to [Xano](https://www.xano.com/) and sign up.
    - Create a workspace for your project.

2. **Setup API Endpoints**:
    - Create endpoints for authentication (`auth/login` and `auth/refresh_tokens`).
    - Create endpoints for processing AI requests to Hugging Face and Assente AI APIs.

3. **Configure Token Storage**:
    - Create a `refresh_tokens` table in Xano linked to the `users` table.

4. **Deploy the backend**:
    - Test endpoints using Xano’s in-built API testing tools.
    - Ensure proper connection between the chatbot frontend and the Xano backend.

---

## Documentation

### Refresh Token Implementation
1. **Initial Login**:
    - Endpoint: `POST /auth/login`
    - Payload: User credentials (email, password).
    - Response: A pair of `authToken` (valid for 2 minutes) and `refreshToken`.

2. **Token Refresh Process**:
    - Endpoint: `POST /auth/refresh_tokens`
    - Header: `Authorization: Bearer {refreshToken}`.
    - Backend Process:
        1. Verify `refreshToken` exists and is valid.
        2. Generate a new `authToken` and `refreshToken`.
        3. Replace the old `refreshToken` in the database with the new one.
    - Response: New `authToken` and `refreshToken` pair.

3. **Frontend Handling**:
    - Store tokens in React Context.
    - Use `authToken` for API calls and `refreshToken` to regenerate expired tokens.

---

## Contributing
Feel free to submit issues or pull requests for feature enhancements or bug fixes.

## License
This project is licensed under the MIT License.


# Chatbot Widget with Authentication and AI Integration

This project delivers a functional chatbot widget built using React and TypeScript, designed for embedding in external webpages. The backend is implemented with Xano, providing user authentication, refresh token logic, and integrations for AI services.

## Features

### Frontend
- **Chatbot Widget**: A lightweight and embeddable React component styled with CSS.
- **User Authentication**: Login and signup processes implemented using React Router.
- **Access Control**: Bot access is restricted to authenticated users, with sessions managed using tokens stored in React Context.

### Backend (Xano)
#### AI Integrations:
- **Hugging Face**: Used as an alternative to OpenAI for free-tier support.
- **Assente AI**: API calls for processing chatbot queries.

#### User Authentication with Refresh Token Logic:
- **Access Tokens**: `authToken` with short lifespan for secure session management.
- **Refresh Tokens**: `refreshToken` stored in a database table linked to users.
- **Token Refresh Mechanism**: Automatically generates new `authToken` when the old one expires.

## Token Refresh Implementation

### Initial Login:
- **Endpoint**: `POST /auth/login`
- **Payload**: User credentials (email, password).
- **Response**: A pair of `authToken` (valid for 2 minutes) and `refreshToken`.

### Token Refresh Process:
- **Endpoint**: `POST /auth/refresh_tokens`
- **Header**: `Authorization: Bearer {refreshToken}`.
- **Backend Process**:
   - Verifies that `refreshToken` exists and is valid.
   - Generates a new `authToken` and `refreshToken`.
   - Replaces the old `refreshToken` in the database.
- **Response**: New `authToken` and `refreshToken` pair.

### Frontend Handling:
- Tokens are stored in React Context.
- The `authToken` is used for API calls, while `refreshToken` is used to regenerate expired tokens.

## Embedding the Chatbot Widget

To embed the chatbot widget on an external webpage:

1. **Install the Package**:
   Include the chatbot widget package in your project dependencies:
   ```bash
   npm i chatbot_andrey_test
   ```

2. **Import and Use the Widget**:
   ```javascript
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
   Ensure the user is authenticated before displaying the chatbot. Use React.Context to manage tokens and pass them as props to the chatbot component.

## Setting Up Xano Backend

1. **Create an Account and Workspace**:
   - Go to Xano and sign up.
   - Create a workspace for your project.

2. **Setup API Endpoints**:
   - Create endpoints for authentication (`auth/login` and `auth/refresh_tokens`).
   - Create endpoints for processing AI requests to Hugging Face and Assente AI APIs.

3. **Configure Token Storage**:
   - Create a `refresh_tokens` table in Xano linked to the `users` table.

4. **Deploy the Backend**:
   - Test endpoints using Xano’s in-built API testing tools.
   - Ensure proper connection between the chatbot frontend and the Xano backend.

## Local Development Setup

To run the chatbot widget locally, follow these steps:

1. **Clone the Repository**
   Clone the project repository to your local machine:
   ```bash
   git clone <repository_url>
   cd chatbot_andrey_test
   ```

2. **Install Dependencies**
   Make sure you have `Node.js` (v18 or higher) and `npm` installed on your machine. Install the dependencies with the following command:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and configure it with the required environment variables. For example:
   ```env
   REACT_APP_API_URL=https://api.example.com
   ```
   Replace the placeholders with actual values needed for the project to connect to the backend or any third-party services.

4. **Run the Development Server**
   Start the development server to see live changes as you develop:
   ```bash
   npm run dev
   ```
   This will run the application on `http://localhost:5173` (default port for Vite).

5. **Build for Production**
   To create a production-ready build, use the build script:
   ```bash
   npm run build
   ```
   The output files will be in the `dist` directory.

6. **Lint and Format Code**
   Before committing your code, you can run the linting script to ensure consistent code quality:
   ```bash
   npm run lint
   ```

7. **Preview Production Build**
   If you want to test the production build locally:
   ```bash
   npm run preview
   ```
   This will serve the production build on a local server for testing purposes.

## Contributing

Feel free to submit issues or pull requests for feature enhancements or bug fixes.

## License

This project is licensed under the MIT License.


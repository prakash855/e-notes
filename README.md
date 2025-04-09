# e-Notes Project

e-Notes is a note-taking application that provides users with the ability to create, read, update, and delete notes. It also includes features to archive notes, pin or unpin them for quick access, and customize the background color of each note. The project is built using Vite, React, TypeScript on the frontend, and Express, Node.js, and MongoDB on the backend. Chakra UI and Tailwind CSS are used for styling, and state management is handled through Redux Toolkit.

## Features

### 1. Create, Read, Update, and Delete (CRUD) Operations

- Users can create new notes with a title and content.
- Existing notes can be viewed, edited, and deleted.

### 2. Archive Notes

- Notes can be archived to keep the main notes list organized.
- Archived notes can be viewed separately.

### 3. Pin and Unpin Notes

- Users can pin notes to have them prominently displayed for quick access.
- Pinned notes can be easily unpinned.

### 4. Customize Note Background Color

- Each note allows users to customize its background color for personalization.

### 5. Authentication and Authorization

- Users can register and log in to their accounts.
- Passwords are securely hashed before storing in the database.
- JWT (JSON Web Tokens) are used for user authentication and session management.
- Middleware is used to protect routes and ensure that only authenticated users can access certain endpoints.

## Tech Stack

### Frontend

- Vite
- React
- TypeScript
- Chakra UI
- Tailwind CSS
- Redux Toolkit for state management

### Backend

- Express
- Node.js
- MongoDB for data storage
- Authentication and Authorization:
  - JWT (JSON Web Tokens) for user authentication and session management.
  - bcrypt for hashing passwords before storing them in the database.
  - Middleware to protect routes and ensure that only authenticated users can access certain endpoints.

## Vercel Configuration

To ensure proper routing in your React application hosted on Vercel, you need to configure Vercel to serve the `index.html` file for all routes. This can be done using a `vercel.json` file.

### `vercel.json`

````json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

## Getting Started

### Prerequisites
1. Node.js and npm installed.
2. MongoDB installed and running.

### Installation
1. Clone the repository.
   ```bash
   git clone https://github.com/prakash855/e-notes.git
````

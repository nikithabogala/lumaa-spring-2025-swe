# Task Management Application

This is a Task Management application built with:
- **React + TypeScript** (frontend)
- **Node.js + TypeScript** (backend)
- **PostgreSQL** (database)

Users can register, log in, and manage their tasks (create, view, update, delete) in a secure manner using JWT authentication.

---

## Demo

Link to the demo: 

https://drive.google.com/file/d/1_fCJLLGdWMrz8zirReKqzs5hh06_2zUn/view?usp=sharing

---

## Features

1. **User Authentication**  
   - Register a new user with a unique username and hashed password (bcrypt).
   - Login to receive a JSON Web Token (JWT).
   - Protected routes: Only authenticated users (with valid JWT) can manage tasks.

2. **Task Management**  
   - Create tasks with title and optional description.
   - View tasks belonging to the logged-in user.
   - Update tasks (mark complete/incomplete, edit text).
   - Delete tasks.

3. **Frontend Navigation**  
   - Shows Login/Register links if unauthenticated.
   - Shows Tasks/Logout if authenticated.
   - Logout button clears JWT and redirects to Login.

---

## Prerequisites

- **Node.js** (v14+ recommended)
- **npm** (included with Node.js)
- **PostgreSQL** (Installed and running on your machine)

---

## 1. Database Setup

### 1.1. Create Database

In PostgreSQL (using pgAdmin or psql), create a new database 
```sql
CREATE DATABASE task_db;
```

### 1.2. Create Tables

Within the task_db, run these SQL commands to create the necessary tables:

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Tasks table
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  "isComplete" BOOLEAN DEFAULT false,
  "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 2. Backend Setup

1. Navigate to backend folder 
  ```bash
  cd Tash_Manager/backend
  ```
2. Install dependencies
  ```bash
  npm install
  ```
3. Create a .env file in the backend folder
```bash
DATABASE_URL=postgresql://<DB_USER>:<DB_PASSWORD>@localhost:5432/task_db
JWT_SECRET=your_jwt_secret_key
PORT=5001
```
4. Test the database cpnnection
```bash
npx ts-node rc/testDBConnection.ts
```
5. Run the development server
```bash
npm run dev
```

---

## 3. Frontend setup


1. Navigate to the frontend folder in a new terminal
```bash
cd Task_Manager/frontend
```
2. Install dependencies
```bash
npm install
```
3. Configure backend URL
```bash
REACT_APP_API_URL=http://localhost:5001
```
4. Run the development server
```bash
npm start
```

---
## 4. Testing Application

### 4.1 Registration and Login

- **Register** a user at http://localhost:3000/register.
  - Provide a unique username and a password.
- **Login** at http://localhost:3000/login.
  - If successful, the JWT is stored in **localStorage**, and you’re redirected to the tasks page.

### 4.2 Task Operations

1. Create a Task
  - On the tasks page, fill out the form (title/description) and click “Add Task”.
2. View Tasks
  - Your tasks appear in a list below the form.
3. Update a Task
  - Click “Mark Complete” / “Mark Incomplete” to toggle completion.
  - Click “Edit” to modify the title or description, then click “Save”.
4. Delete a Task
  - Click “Delete” to remove a task.
5. Logout
  - Click the “Logout” button in the navigation to clear your token and return to the login page.


## Final checks

- Make sure **PostgreSQL** is running and the tables are created.
- npm run dev **(backend)** on port **5001**.
- npm start **(frontend)** on port **3000**.
- **Register**, **Login**, and **manage** tasks.


## Salary Expectations

- Monthly around **4000$-6000$** ( negotiable ).




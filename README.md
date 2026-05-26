# AI-Driven Learning Platform (Mini MVP)
### Official Project Documentation & System Architecture Overview

A production-grade, full-stack mini learning platform that allows users to explore various fields of knowledge. Users can select categories and sub-categories, submit customized prompts to an AI assistant to generate personalized lessons, and track their entire learning history. Additionally, an administrative dashboard is included to monitor users and their learning history with full filtering and pagination capabilities.

---

## 🚀 Features

### 💻 Frontend (React)
* **User Authentication:** Registration and Login forms backed by JWT security.
* **Interactive Dashboard:** Category and sub-category selection with dynamic prompt submission.
* **AI Response View:** Beautiful markdown-friendly display of AI-generated lessons.
* **Learning History:** Personalized user space to view past generated lessons.
* **Admin Control Panel:** Secured routes allowing admins to audit all users' prompt history with high-performance server-side pagination and user filtering.

### ⚙️ Backend (Node.js & Express)
* **Modular Architecture:** Structured layered patterns separating Routes, Controllers, Models, Middlewares, and Services.
* **Robust Authentication:** Secure JWT-based route protection and role-based access control (RBAC).
* **AI Integration:** Seamless integration with OpenAI GPT API for content generation.
* **Database Scalability:** MongoDB implementation with optimized relational-like references using Mongoose.
* **API Documentation:** Integrated Swagger/OpenAPI specification.
* **Global Error & Validation Handling:** Centralized error interceptors and strict incoming data validation middlewares.

---

## 🛠️ Technologies Used

* **Frontend:** React, React Router, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose ORM
* **Security:** JSON Web Tokens (JWT), bcryptjs
* **Documentation:** Swagger UI Express

---

## 📋 Architectural Assumptions & Design Choices

1. **Role-Based Access Control (RBAC):** Users are assigned a role (`user` or `admin`) upon registration. Admin actions (like auditing all prompts) are strictly protected via specialized backend middleware and mirrored by conditional routing inside the React application.
2. **Database Integrity:** Since MongoDB is NoSQL, data references are kept lightweight. The `Prompt` schema links back to `User`, `Category`, and `SubCategory` via ObjectIds, utilizing Mongoose `.populate()` to provide efficient hydration on query execution.
3. **Enterprise Readiness:** Pagination is enforced natively on the database layer using `.skip()` and `.limit()` inside the Admin endpoints to ensure high performance even with millions of registered logs.

---

## 💻 Getting Started (Local Setup)

### 📌 Prerequisites
* Node.js (v16 or higher recommended)
* MongoDB instance running locally or via MongoDB Atlas

### 🔧 Backend Configuration

1. Navigate to the backend directory:
   cd backend

2. Install dependencies:
   npm install

3. Change the JWT and the OPENAI_API_KEY in the .env file:
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ai_learning_platform
   JWT_SECRET=your_super_secret_jwt_key_here
   OPENAI_API_KEY=your_openai_api_key_here

4. Seed categories and sub-categories (Optional, if seeder script is present):
   npm run seed

5. Start the development server:
   npm run dev

### 🎨 Frontend Configuration

1. Navigate to the frontend directory:
   cd ../frontend

2. Install dependencies:
   npm install

3. Start the Vite development application:
   npm run dev

---

## 📄 API Documentation

Once the backend server is running, you can explore and test the API interactively using Swagger UI at:
http://localhost:5000/api-docs

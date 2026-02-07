# 📝 Blogify

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1.16-38B2AC?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-22.17.1-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.2.0-47A248?logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-2.5.8-880000?logo=mongoose)


A full-stack blogging platform where users can securely sign up, sigin, and manage their personal blog posts. Built with React.js, Node.js, ExpressJs, and MongoDB, Blogify showcases clean authentication, protected routes, and real-time CRUD operations—all wrapped in a user-friendly interface.

---

## 🚀 Features

- 🔐 **JWT Authentication** – Secure login and signup with token-based access
- 🛡️ **Protected Routes** – Dashboard access only for authenticated users
- 📝 **Create Blogs** – Add new blog posts with title and content
- ✏️ **Edit Blogs** – Update existing posts via a sleek modal interface
- 🗑️ **Delete Blogs** – Remove posts instantly with real-time UI updates
- 📦 **Modular Codebase** – Clean separation of frontend and backend logic

---

## 🛠️ Tech Stack

| Frontend       | Backend                    | Database      |
|----------------|----------------------------|---------------|
| React + Vite   | Node.js + ExpressJs        |  MongoDB      |
| Tailwind CSS   | JWT Auth, cookie-parser    | (Mongoose)    |
| Axios          | REST API                   |               |

---

## 🧪 How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/Arin-Yadav/Fullstack-Blogify-website.git
cd MINI_BLOGIFY
```

### 2. Set up the backend

```bash
cd backend
npm install
touch .env
```

Add your environment variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd frontend
npm install
touch .env
```

Add your API URL:

```
VITE_API_URL=Your_API_URL
```

Start the frontend:

```bash
npm run dev
```
---

## 🙌 Credits

- Built by [Arin Yadav](https://github.com/Arin-Yadav) as a full-stack showcase project.
- Follow Me on LinkedIN - https://www.linkedin.com/in/arinyadav/
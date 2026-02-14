# 📝 Blogify

# Note - To run this Please Create .env file, you can see the .env.example to know the required env variables
# Note - You can find the Project setup and installation at the bottom of this README

# 📝 Blog Website

A full-stack **MERN blog application** built with **React.js, Tailwind CSS, Node.js, Express.js, and MongoDB**.  
This project demonstrates end-to-end web development skills, including **content creation, presentation, interaction, and navigation** — all wrapped in a responsive, modern design.

---

## 🚀 Features
- **Create Blog Posts**
  - Responsive form with validation (`react-hook-form`).
  - Image upload support with backend storage.
  - Author association via Redux user state.

- **Display Blogs**
  - Homepage grid of featured posts.
  - Blog cards with image, title, excerpt, and “Read More” link.
  - Single blog detail view with header image, title, author, date, and content.

- **Comments System**
  - Full-width responsive layout.
  - Avatar + username on the left, date/time aligned right.
  - Comment text displayed below in a clean card style.
  - Differentiates own comments vs others with color-coded avatars.

- **Navigation**
  - Previous/Next blog links at the bottom of each blog detail page.
  - Seamless reading flow across posts.

---

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, React Router, Redux  
- **Backend**: Node.js, Express.js, RESTful APIs  
- **Database**: MongoDB  
- **Image Handling**: Express static file serving  
- **Environment Variables**: `VITE_SERVER_URL` for API base URL  

---

## 📱 Responsiveness & UI/UX
- Mobile-first design with adaptive layouts.  
- Smooth transitions and hover states for interactivity.  
- Clean typography hierarchy for readability.  
- Consistent card styling across blogs and comments.  

---

## 🎯 Professional Value
This project demonstrates:
- **Full-stack MERN expertise** with real-world features.  
- **Responsive UI/UX design** aligned with modern standards.  
- **Code organization and scalability** with modular components.  
- **Recruiter‑friendly presentation** highlighting both technical and design skills.  

---

## ⚡ Getting Started

### Prerequisites
- Node.js(Latest version - Recommended) and npm installed
- MongoDB running locally or on a cloud service

### Installation
```bash
# Clone the repository
git clone https://github.com/Arin-Yadav/Blogify-website.git

# Navigate into the project folder
cd fullstack-blogify-website

# Navigate to Frontend
cd frontend

# Install dependencies For both frontend
npm install

# Navigate to Backend
cd backend

# Install dependencies For both backend
npm install

# Start the development server
npm run dev

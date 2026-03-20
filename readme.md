# 🧠 Habit Tracker – MERN Stack

A full-stack productivity SaaS application that helps users build and maintain daily habits by tracking progress, calculating streaks, and visualizing performance through analytics dashboards.

Designed with a production-style backend architecture using Node.js, Express, MongoDB, and secure JWT authentication.

---

## 🚀 Live Demo & API Docs

🔗 Live App: being worked upon
📬 API Docs (Postman): being worked upon

---

## ✨ Features

- 🔐 Secure authentication (JWT + httpOnly cookies)
- ➕ Create, manage, and delete habits
- ✅ Daily habit completion tracking
- 🔥 Dynamic streak calculation (consecutive days logic)
- 📊 Monthly analytics dashboard (Recharts)
- 📅 Date-normalized logging system
- 🧠 Aggregation-based statistics APIs
- 🌙 Clean, responsive UI

---

## 🏗 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## 📁 Project Structure

HabbitApp/
│
├── client/ # React frontend
│ ├── src/
│ ├── components/
│ └── pages/
│
├── server/ # Node.js backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ ├── middleware/
│ └── utils/
│
├── .gitignore
└── README.md

🧠 Core Engineering Concepts

    RESTful API design

    MVC backend architecture

    MongoDB schema relationships (User → Habit → HabitLog)

    JWT-based authentication with secure cookies

    Streak calculation using date normalization

    Aggregation pipelines for analytics

    Full-stack integration (React + Node.js)

📊 Example Use Case

    User logs in

    Creates a habit (e.g., "Workout")

    Marks it complete daily

    System calculates streak automatically

    Dashboard shows monthly performance
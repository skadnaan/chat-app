# Real-Time Chat Application

A full-stack real-time chat application built with **React + Vite**, **Node.js/Express**, **MongoDB**, and **Socket.io**, supporting real-time messaging, online user status, profile editing, media sharing, and responsive UI.

## 🚀 Live Demo

Frontend (Vercel): https://chat-app-fe-pearl.vercel.app/
Backend (Render): https://chat-app-6l6b.onrender.com
when you paste this render url remember to type '/api/status' at the end of url cause the default route is set to '/api/status' ...

## 📸 Features

* ✅ Real-time chat with **Socket.io**
* ✅ JWT Authentication (Login / Signup / Logout)
* ✅ Online/offline status indicator
* ✅ Send & receive text messages
* ✅ Send Images in chat
* ✅ Unread message badge
* ✅ Profile update (name + avatar)
* ✅ Search users
* ✅ Mobile Responsive UI
* ✅ Session-based tab login behavior for testing
* ✅ Production-ready deployment (Vercel + Render)

---

## 🛠️ Tech Stack

### Frontend

* React + Vite
* Tailwind CSS
* Socket.io-client
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Socket.io
* JWT Auth
* Bcrypt
* CORS

### Deployment

* **Frontend** → Vercel
* **Backend** → Render
* **Database** → MongoDB Atlas

---

## 📂 Folder Structure

```
chat-app/
├── client/      # React Frontend
└── server/      # Node.js + Express Backend
```

---

## ⚙️ Installation & Setup

```

### Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server
npm install
```

### Environment Variables

#### Frontend (.env)

```
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

#### Backend (.env)

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=https://your-frontend.vercel.app
```

### Run App Locally

#### Start Backend

```bash
cd server
npm start
```

#### Start Frontend

```bash
cd client
npm run dev
```

---

## 📡 Socket Events Used

| Event            | Description                   |
| ---------------- | ----------------------------- |
| `connect`        | User connects to socket       |
| `getOnlineUsers` | Broadcast active online users |
| `disconnect`     | User disconnects              |

---

## 🔐 Authentication

* JWT stored in Browser Storage
* Token auto-attached via Axios interceptor
* Protected routes middleware on backend

---

## 🧪 Testing Multi-User Chat

Open two different tabs:

* Normal mode

Login with different accounts & chat ✅

---

## 🚧 Upcoming Features

* Typing indicator
* Message seen ✔✔ check
* Dark/Light theme toggle
* Push notifications
* Cloud media storage (Cloudinary)

---

## ⭐ Show Your Support

If you liked this project:

* ⭐ Give a star on GitHub
* 🪪 Follow for more projects!


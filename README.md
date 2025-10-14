# 🌿 ReMiti — Plant. Record. Restore.

**ReMiti** is a web app designed to **motivate individuals to plant trees** and take action against land degradation.  
Users can create an account, record the number of trees they plant, and earn **points** based on their impact.  
Every 100 trees = 10 points 🌳💚

---

## 🚀 Features

- 🌱 User registration and authentication (Sign up / Sign in)
- 🌿 Personalized dashboard to record planted trees
- 🏆 Point system: automatic calculation of environmental contribution
- 📊 Real-time stats and progress tracking
- ☁️ Deployed using **Render**

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | Node.js with Express |
| **Database** | PostgreSQL           |
| **Hosting** | Render |

Project Live Link:
https://landdegradation.onrender.com/

---

## ⚙️ Local Setup Guide

Follow these steps to run ReMiti locally on your computer:

### 1. Clone the repository
```bash
git clone https://github.com/SERAH-K/LandDegradation.git
cd ReMiti






## 2. Install dependencies

npm install



## 3. Create an environment file

In the project root, create a file named .env and add:

PORT=4000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key




## 4. Run the server

node server.js


The backend will run on http://localhost:4000

Your frontend (in the /public folder) can be accessed through the same domain.



## 🌍 Deployment (Render)

Push your project to GitHub.

Create a Render Web Service:

Connect to your GitHub repo

Choose Node.js

Add environment variables (PORT, DATABASE_URL, JWT_SECRET)

Deploy and Render will handle the build automatically.



## 🧠 How the Points Work

For every 100 trees planted, users gain 10 points.
Example:

100 trees → 10 points


This motivates consistency and measurable impact 🌎




## 👥 Collaborators

| Name           | Role              |                    GitHub                        |
| --------- -----|------------------ | ------------------------------------------------ |
| Reuben Mwikya  | BackEnd Developer | Username:   reubenm597                           |
|                |                   | Email:    mwikyareuben597@gmail.com              |
| —   -  -  -  - |  -   -   -  —  -  | -   -   -   - -  -    -   -   -   -  -   -   -  -|



## 📜 License

This project is licensed under the MIT License — free to use, modify, and distribute.



## 💚 Inspiration

ReMiti is inspired by the idea that small, consistent actions can restore our planet.
Every tree counts — record yours and be part of the change.






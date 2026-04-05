# 💰 Finance Dashboard Backend

## 🚀 Live API
https://finance-dashboard-backend-sqbs.onrender.com

## 📄 API Documentation (Swagger)
https://finance-dashboard-backend-sqbs.onrender.com/api-docs

---

## 📌 Project Overview

This project is a backend system for managing financial data including income and expenses. It provides secure APIs for user authentication, role-based access control, financial record management, and dashboard analytics.

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT (Authentication)
- Swagger (API Documentation)

---

## 🔐 Features

### 👤 User & Role Management
- Register/Login users
- Roles: Admin, Analyst, Viewer
- Role-based access control (RBAC)

### 💰 Financial Records
- Create, Read, Update, Delete records
- Fields: amount, type, category, date, notes
- User-specific data handling

### 🔍 Filtering
- Filter by:
  - Date range
  - Category
  - Type (income/expense)

### 📊 Dashboard APIs
- Total Income
- Total Expenses
- Net Balance
- Category-wise totals
- Recent transactions

### 🛡️ Security
- JWT authentication
- Password hashing (bcrypt)
- Protected routes
- Rate limiting
- Helmet security headers

### 📄 API Documentation
- Swagger UI integration
- Test APIs directly from browser

---

## 📁 Project Structure
/config
/controllers
/models
/routes
/middlewares
/services
/utils
/validations
app.js
server.js


## ⚙️ Installation & Setup

git clone (https://github.com/sunnyvarun/finance-dashboard-backend)
cd finance-dashboard-backend
npm install
npm run dev

🔑 Environment Variables

Create a .env file:

PORT=3000

MYSQLHOST=your_host
MYSQLUSER=your_user
MYSQLPASSWORD=your_password
MYSQLDATABASE=your_db
MYSQLPORT=3306

JWT_SECRET=your_secret
JWT_EXPIRE=7d
🌍 Deployment
Backend hosted on Render
Database hosted on Railway (MySQL)
🧪 API Testing

Use:

Swagger UI
Postman / Thunder Client
📌 Future Improvements
Pagination for large datasets
Advanced analytics (monthly trends)
Frontend dashboard (React)
Unit & integration testing
👨‍💻 Author

Varunkanth

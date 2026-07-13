# Bulk Mail App

A full-stack Bulk Mail Application built using React, Node.js, Express, MongoDB, and Nodemailer. This application allows an admin to log in, upload an Excel file containing email addresses, send bulk emails, and view email history.

---

## Features

- Admin login authentication
- Upload Excel files (.xlsx, .xls)
- Extract recipient email addresses
- Send bulk emails using Nodemailer
- Store email records in MongoDB
- View email history
- Success and failure messages
- Responsive UI using Tailwind CSS

---

## Tech Stack

### Frontend

- React
- Tailwind CSS
- Axios
- XLSX
- React Router DOM

### Backend

- Node.js
- Express.js
- Nodemailer
- MongoDB
- Mongoose
- Dotenv
- Cors

---

## Project Structure

```text
bulk-mail-app/

├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── BulkMailer.jsx
│   │   │   └── History.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── models/
│   │   ├── Admin.js
│   │   └── Mail.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/akashnoyal/bulk-mail-app.git
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file inside the `backend` folder.

```env
MONGO_URL=your_mongodb_connection_string

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_gmail_app_password
```

---

## API Endpoints

### Login

```http
POST /login
```

### Send Bulk Email

```http
POST /sendemail
```

### Get Email History

```http
GET /history
```

---

## Admin Credentials

```text
Email: admin@gmail.com

Password: admin123
```

You can change these credentials from the MongoDB database.

---

## How It Works

1. Admin logs in.
2. Upload an Excel file containing email addresses.
3. Enter the email subject and message.
4. Click **Send Bulk Mail**.
5. Emails are sent using Nodemailer.
6. Email records are stored in MongoDB.
7. View previously sent emails from the History page.

---

## Future Enhancements

- JWT authentication
- Password encryption using bcrypt
- Rich text editor
- Email templates
- Pagination for email history
- File validation

---

## Author

**Akash Noyal**

GitHub: https://github.com/akashnoyal
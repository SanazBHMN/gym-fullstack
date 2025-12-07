# Gym Management App – Fullstack Project

## Overview

This project is a full-stack gym management application that demonstrates:

- **Two databases:** PostgreSQL (SQL) and MongoDB (NoSQL)
- **React frontend** with unified interface
- **CRUD operations** for users
- **Joined views** of related tables for richer information

The app allows managing gym users, memberships, classes, trainers, bookings, feedback, and equipment.

---

## Tech Stack

- **Backend:** Node.js, Express, Prisma (PostgreSQL), MongoDB
- **Frontend:** React, Vite, TailwindCSS + DaisyUI
- **Databases:** PostgreSQL, MongoDB

---

## Database Structure

### PostgreSQL Tables

- **User:** stores user info
- **Membership:** membership types
- **Class:** gym classes with schedule and trainer
- **Trainer:** trainer info
- **Booking:** connects users to classes

### MongoDB Collections

- **users:** users with feedback
- **classes:** reference for classes
- **bookings:** Mongo-specific bookings
- **feedback:** user feedback
- **equipment:** gym equipment

> **Note:** Three similar tables exist across both databases (users, classes, bookings).

---

## Features

- **Dropdown filter:** Show users from all, Postgres, Mongo, or joined view
- **Add User Form:**
  - Name + Email → saves to PostgreSQL
  - Name + Email + Feedback → saves to MongoDB
- **User List:**
  - Edit inline (name, email, feedback)
  - Delete via checkbox
  - Shows membership, trainer, and class info (from SQL join)

---

## Setup

### Backend

1. Clone repo:

```bash
git clone <repo-url>
cd gym-fullstack/backend
npm install
```

2. Create .env:

```bash
DATABASE_URL="postgresql://gymuser:yourpassword@localhost:5432/gymapp?schema=public"
MONGODB_URL="mongodb://localhost:27017/gymapp_mongo"
PORT=5000
```

3. Run migrations (PostgreSQL):

```bash
npx prisma migrate dev --name init
```

4. Seed MongoDB (optional):

```bash
node seedMongo.js
```

5. Start server:

```bash
node src/index.js
```

### Frontend

1. Navigate to frontend:

```bash
cd ../frontend
npm install
```

2. Start dev server

```bash
npm run dev

```

App runs at http://localhost:5173

### System Architecture

### Database Demonstration

![Database Demonstration](db-structure.png)

### Data Model

![Data Model](data-model.png)

### Notes

- Frontend shows unified data from both databases

- Users with feedback are saved in MongoDB, others in PostgreSQL

- The app demonstrates cross-database integration for educational purposes

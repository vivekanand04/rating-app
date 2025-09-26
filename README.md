# Store Rating Platform

**FullStack Intern Coding Challenge**

A web application that allows users to submit ratings (1–5) for stores registered on the platform. Single sign-on is implemented for all users and functionality is role-based: System Administrator, Store Owner, and Normal User.

---

## Live Demo
https://rating-app-frontend4.onrender.com

## GitHub Repository
https://github.com/vivekanand04/rating-app

---

## Tech Stack
- **Frontend:** React.js  
- **Backend:** Express.js (Node.js)  
- **Database:** PostgreSQL  
- **Authentication:** JWT / session-based (depending on implementation)

---

## Features / Requirements Implemented
### System Administrator
- Add new stores, normal users, and admin users.
- Dashboard showing:
  - Total number of users
  - Total number of stores
  - Total number of submitted ratings
- Add users with: Name, Email, Password, Address
- View lists of stores (Name, Email, Address, Rating)
- View lists of normal/admin users (Name, Email, Address, Role)
- Filter listings by Name, Email, Address, Role
- View user details (including store owner's rating if role = Store Owner)
- Logout

### Normal User
- Sign up and log in
- Signup fields: Name, Email, Address, Password
- Update password after login
- View all registered stores
- Search stores by Name and Address
- Store listing shows:
  - Store Name
  - Address
  - Overall Rating
  - User's Submitted Rating
  - Option to submit a rating
  - Option to modify their submitted rating
- Submit ratings between 1 and 5
- Logout

### Store Owner
- Login
- Update password after login
- Dashboard shows:
  - List of users who have submitted ratings for their store
  - Average rating of their store
- Logout

---

## Demo Credentials (for evaluation)
- **System Admin**  
  Email: `demoadmin01@gmail.com`  
  Password: `Demo@123`

- **Store Owner**  
  Email: `demoowner01@gmail.com`  
  Password: `Demo@123`

- **Normal User**  
  Email: `demouser01@gmail.com`  
  Password: `Demo@123`

---

## Form Validation Rules
- **Name:** Min 20 characters, Max 60 characters  
- **Address:** Max 400 characters  
- **Password:** 8–16 characters, must include at least one uppercase letter and one special character  
- **Email:** Must follow standard email validation rules

---

## Additional Notes / Requirements
- All table/list views support sorting (ascending/descending) on key fields like Name, Email, etc.
- Best practices followed for frontend and backend structure and code organization.
- Database schema designed following standard normalization and indexing best practices.

---

## Installation & Run (Local)

### Prerequisites
- Node.js (v16+ recommended)
- npm
- PostgreSQL (or MySQL if you prefer — update DATABASE_URL accordingly)


Contact
Vivekanand Kumar
Phone: +91 81329 46400
NIT Arunachal Pradesh
   git clone https://github.com/vivekanand04/rating-app.git
   cd rating-app/server

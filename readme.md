
# Application Management API

## Overview
This repository contains a set of APIs to manage user signup, login, user data retrieval, and borrowing money. The APIs are designed to handle user verification, authentication, and financial transactions efficiently and securely.

## Table of Contents
- [Application Management API](#application-management-api)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [API Endpoints](#api-endpoints)
    - [1. Approve Application During Signup](#1-approve-application-during-signup)
    - [2. Login API](#2-login-api)
    - [3. Show User Data](#3-show-user-data)
    - [4. Borrow Money API](#4-borrow-money-api)-
  - [Folder Structure](#folder-structure)
  - [Setup and Installation](#setup-and-installation)
  
 

## API Endpoints

### 1. Approve Application During Signup
- **Endpoint:** `POST /signup`
- **Functionality:**
  - Approves or rejects the application based on user age and monthly salary.
  - Registers the user after all verification steps.
  - Maintains a status field to handle the user application status.
- **Request Body:**
   ```json
  {
    "phone_number": "string",
    "email": "string",
    "name": "string",
    "date_of_registration": "YYYY-MM-DD",
    "dob": "YYYY-MM-DD",
    "monthly_salary": "number"
  }
- **Validation Criteria:**
  - User should be above 20 years of age.
  - Monthly salary should be 25k or more.
- **Response:**
   ```json
  {
    "message": "string"
  }
### 2. Login API
- **Endpoint:** `POST /login`
- **Functionality:**
  - Allows user to login using email and password.
  - Uses JWT for authentication.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
- **Response:**
  ```json
  {
    "token": "JWT token",
    "message": "string"
  }
### 3. Show User Data
- **Endpoint:** `GET /user`
- **Functionality:**
  - Shows user data with the following fields:
    - Purchase Power amount
    - Phone number
    - Email
    - Date of user registration
    - DOB
    - Monthly salary
- **Response:**
   ```json
  {
    "purchase_power": "number",
    "phone_number": "string",
    "email": "string",
    "date_of_registration": "YYYY-MM-DD",
    "dob": "YYYY-MM-DD",
    "monthly_salary": "number"
  }
### 4. Borrow Money API
- **Endpoint:** `POST /borrow`
- **Functionality:**
  - Allows the user to borrow money from the application.
  - Updates the Purchase Power amount.
  - Calculates the tenure of repayments and the monthly repayments with an interest rate of 8%.
  - Returns the updated Purchase Power amount and the monthly repayment amount.
- **Request Body:**
  ```json
  {
    "borrowAmount": "number",
    "tenureMonths" : "number",
  }
- **Response:**
   ``` json
  {
    "updated_purchase_power": "number",
    "monthly_repayment": "number"
  }
## Folder Structure
```
MoneyLendingApp

├── node_modules
├── src
│ ├── config
│ │ ├── database.js
│ │ └── serverConfig.js
│ ├── controllers
│ │ └── userController.js
│ ├── middlewares
│ │ └── authValidator.js
│ ├── models
│ │ └── user.js
│ ├── repository
│ │ └── userRepository.js
│ └── routes
│   └── index.js
├── .env
├── package-lock.json
├── package.json
└── README.md
```
## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/moneyLendingApp.git
   cd application-management-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
      ```
      PORT=3000
      JWT_SECRET=your_jwt_secret
      ```


4. Start the server:
   ```bash
   npm start
   ```



## Screenshots


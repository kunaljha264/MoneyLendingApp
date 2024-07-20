
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
  - [Screenshots](#screenshots)
  
 

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
SignUp

![image](https://github.com/user-attachments/assets/3d38ad59-81aa-4017-996d-157cf4e16fe7)
![image](https://github.com/user-attachments/assets/eeea9552-a30f-4226-adce-2b842ba11626)
![image](https://github.com/user-attachments/assets/aeffa556-d398-4349-8515-9723cc1e6fc2)
![image](https://github.com/user-attachments/assets/5c8f8844-e345-4a77-9cd7-55c2441e5d3b)
![image](https://github.com/user-attachments/assets/111854ba-8b77-430d-97b3-2ec13c52463a)

LogIn

![image](https://github.com/user-attachments/assets/2e0d8cd9-297e-419c-805c-f59c722bc7ed)
![image](https://github.com/user-attachments/assets/4ee936d0-2e76-483e-b342-d4cfb219473e)
![image](https://github.com/user-attachments/assets/982e85dd-4178-4ff7-b8d0-a336a69d295e)

getUser

![image](https://github.com/user-attachments/assets/3ecafbf4-9785-4c95-8f62-fbe4e4e25efd)
![image](https://github.com/user-attachments/assets/201ad4d6-bfb2-499b-940f-cd46e1b1a30c)

borrow

![image](https://github.com/user-attachments/assets/5d476302-3c9b-4440-8673-585e990a5a57)
![image](https://github.com/user-attachments/assets/a670eec1-0604-4134-b134-bb5750fc1193)
![image](https://github.com/user-attachments/assets/18717cd7-5993-431f-818e-4a9f36678444)












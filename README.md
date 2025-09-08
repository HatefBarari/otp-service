🔐 OTP Service

A simple Node.js application for sending One-Time Passwords (OTP) via SMS.
This project generates and sends temporary codes to users for secure authentication.

✨ Features

Generate unique OTP codes

Send OTP via SMS

Secure authentication for login/register flows

Customizable expiration time for OTPs

API testing with Postman collection

🚀 Getting Started
Prerequisites

Node.js installed

npm installed

An SMS provider account (e.g., FarazSMS, Twilio, etc.)

Installation
git clone https://github.com/HatefBarari/otp-service.git
cd otp-service
npm install

Run the project
node server.js

🧪 API Testing with Postman

Import the file OTP.postman_collection.json into Postman.

Use it to test all available OTP endpoints (generate, send, verify if implemented).

🛠 Tech Stack

Node.js

Express.js (if used)

SMS API (e.g., FarazSMS, Twilio)

📌 Project Status

This is a simple OTP authentication service.
Future improvements may include:

Email OTP delivery

Multi-language message support

Database integration for tracking requests

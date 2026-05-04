# fiverrBackend

Welcome to the **fiverrBackend** project! A high-performance, feature-rich, and robust RESTful API built with **Node.js**, **Express**, and **MongoDB**. This backend serves as the core engine for a Fiverr clone application, handling everything from user authentication to gig management and media uploads.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Bullseye.png" alt="Bullseye" width="25" height="25" /> Project Overview

fiverrBackend enables developers and users to:

- **Manage Gigs:** Full CRUD operations for creating, reading, updating, and deleting service listings (Gigs).
- **Advanced Authentication:** Secure login/signup system using **JWT** stored in cookies for enhanced security.
- **User Profiles:** Comprehensive user management with role-based attributes and profile customization.
- **Media Handling:** Seamless image uploads and management integrated with **Cloudinary** and **Multer**.
- **Security & Performance:** Implements secure password hashing with **BcryptJS**, CORS protection, and cookie-based session management.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="25" height="25" /> Features

- **TypeScript Power:** Built entirely with **TypeScript** for robust type safety and better developer experience.
- **Cloudinary Integration:** Automated image hosting and optimization using the **Cloudinary** cloud service.
- **Secure Auth:** JWT-based authentication with expiration handling and secure cookie storage.
- **Modular Architecture:** Clean routing and controller structure for scalability.
- **ODM Integration:** Uses **Mongoose** for elegant MongoDB object modeling and validation.
- **Cross-Origin Support:** Configured **CORS** to allow secure communication with the frontend application.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hammer%20and%20Wrench.png" alt="Hammer and Wrench" width="25" height="25" /> Technologies Used

- **Node.js** (Runtime Environment)
- **Express.js** (Web Framework - v5.1.0)
- **MongoDB & Mongoose** (Database & ODM)
- **TypeScript** (Language)
- **JSON Web Token (JWT)** (Authentication)
- **BcryptJS** (Password Hashing)
- **Multer** (File Uploads)
- **Cloudinary** (Cloud Image Management)
- **Cookie-Parser** (Cookie Handling)

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Desktop%20Computer.png" alt="Desktop Computer" width="25" height="25" /> Setup & Installation

To run the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/ozandmrcn/fullStackFiverr.git

# Navigate to the project folder
cd fullStackFiverr/api

# Install required dependencies
npm install

# Start the development server (using nodemon)
npm run dev

# Build the project
npm run build

# Start the production server
npm start
```

### ⚙️ Environment Variables (.env Setup)

Create a `.env` file in the `api` directory and define the following variables:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/fiverr

# JWT Authentication
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES=1209600

# Cloudinary Configuration (For Image Uploads)
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_SECRET=your_api_secret

# Frontend Integration
CROSS_ORIGIN=http://localhost:5173
```

> ⚠️ **Note:** Ensure you have a Cloudinary account to handle gig and profile image uploads correctly.

## 📧 Contact

For any questions or feedback, feel free to contact:  
**Ozan Demircan** – ozandmrcn47@gmail.com

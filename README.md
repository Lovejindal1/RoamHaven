# 🏕️ RoamHaven — Full-Stack Vacation Rental & Geo-Discovery Platform

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-25.x-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-Framework-000000?style=for-the-badge&logo=express" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-Mongoose_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Mapbox-Geospatial_GL-000000?style=for-the-badge&logo=mapbox&logoColor=white" alt="Mapbox">
  <img src="https://img.shields.io/badge/Cloudinary-Asset_Pipeline-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary">
  <img src="https://img.shields.io/badge/Passport.js-Session_RBAC-34E0A1?style=for-the-badge&logo=passport&logoColor=black" alt="Passport.js">
  <img src="https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
</p>

---

## 📌 Overview

**RoamHaven** (formerly Project-Airbnb) is an end-to-end full-stack rental marketplace engineered with modern MVC architecture. The platform allows travelers to explore unique vacation stays worldwide, filter accommodations by curated categories (Trending, Iconic Cities, Mountains, Arctic, Camping), inspect interactive **Mapbox geospatial coordinates**, and manage verified user reviews.

Built with **Node.js, Express.js, MongoDB Atlas**, and dynamic server-rendered **EJS templates**, RoamHaven demonstrates production patterns for session management, schema validations, role-based access control, and cloud asset processing.

---

## 🌟 Key Engineering Features

- **🗺️ Interactive Mapbox Geocoding & GL Pinning**:
  - Forward geocoding coordinates computed automatically from location queries using Mapbox SDK.
  - Interactive map render on property detail pages displaying custom glowing coordinates and zoom controls.
- **📸 Cloudinary Image Upload Pipeline**:
  - Image handling using `multer` multi-part parser with `multer-storage-cloudinary` for auto-optimization and CDN delivery.
- **🛡️ Secure Session Auth & Role-Based Access (RBAC)**:
  - Local authentication via `Passport.js` with salted and hashed passwords (`passport-local-mongoose`).
  - Persistent session management backed by MongoDB Atlas using `connect-mongo`.
  - Strict middleware guards ensuring only property owners can edit or delete their listings.
- **🔒 Schema Integrity & Cascading Data Cleanup**:
  - Server-side request body sanitization and strict schema enforcement using `Joi`.
  - Mongoose `post('findOneAndDelete')` middleware hooks that automatically purge associated reviews whenever a listing is deleted.
- **⭐ Community Reviews & Dynamic Tax Calculators**:
  - 5-star customer review rating system with instant feedback cards.
  - Real-time client-side tax switch toggle dynamically computing total stay costs (+18% GST).

---

## 🏗️ Architecture & MVC Structure

```
RoamHaven/
├── controllers/          # Route business logic handlers
│   ├── listings.js       # Listing CRUD operations
│   ├── reviews.js        # Review creation & deletion logic
│   └── users.js          # Authentication workflows
├── models/               # Mongoose database schemas
│   ├── listing.js        # Listing schema with GeoJSON coordinates
│   ├── review.js         # Review schema with author references
│   └── user.js           # User credentials schema
├── routes/               # Express modular route definitions
│   ├── listing.js        # /listings endpoints
│   ├── review.js         # /listings/:id/reviews endpoints
│   └── user.js           # /signup, /login, /logout endpoints
├── views/                # EJS Mate server-side templates
│   ├── includes/         # Navbar, footer & flash message partials
│   ├── layouts/          # Boilerplate HTML shell
│   └── listings/         # Index, Show, Edit & New listing views
├── public/               # Client-side CSS, JS & rating widgets
├── middleware.js         # Authentication & ownership authorization guards
├── schema.js             # Joi validation schemas
├── cloudConfig.js        # Cloudinary SDK credentials configuration
└── app.js                # Application entry point & MongoDB Atlas connection
```

---

## 📡 RESTful API Route Specification

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/listings` | Index view of all listings (with search & category filters) | Public |
| `GET` | `/listings/new` | Form to create a new property listing | Yes |
| `POST` | `/listings` | Process new listing creation with Cloudinary image upload | Yes |
| `GET` | `/listings/:id` | Detailed listing view with Mapbox spatial coordinates & reviews | Public |
| `GET` | `/listings/:id/edit` | Form to edit existing listing details | Yes (Owner Only) |
| `PUT` | `/listings/:id` | Update listing data & replace photos | Yes (Owner Only) |
| `DELETE` | `/listings/:id` | Delete listing & trigger cascading review deletion hook | Yes (Owner Only) |
| `POST` | `/listings/:id/reviews` | Post a new 5-star review and feedback comment | Yes |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Delete an existing review | Yes (Author Only) |
| `GET` | `/signup` | User registration view | Public |
| `POST` | `/signup` | Register new user account & auto-login session | Public |
| `GET` | `/login` | User login view | Public |
| `POST` | `/login` | Authenticate credentials & redirect to target path | Public |
| `GET` | `/logout` | Invalidate session and destroy user cookie | Yes |

---

## 🚀 Local Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/Lovejindal1/Project-Airbnb.git
cd Project-Airbnb
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_public_token
ATLASDB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/roamhaven
SECRET=your_production_session_secret
```

### 4. Start the Application
```bash
node app.js
```
The server will start listening at: `http://localhost:8080/listings`

---

## 👨‍💻 Author

**Love Kumar**  
Computer Science & Engineering, **IIIT Una** (2024 – 2028)  
- LinkedIn: [love-kumar-jindal](https://www.linkedin.com/in/love-kumar-jindal/)  
- GitHub: [@Lovejindal1](https://github.com/Lovejindal1)  
- LeetCode: [@JINDALSAHAAB](https://leetcode.com/u/JINDALSAHAAB)  

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

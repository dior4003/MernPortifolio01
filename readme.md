```markdown
# 🚀 MERN Portfolio Backend API

Modular, secure, and scalable REST API built with Express.js, MongoDB, and Cloudinary — designed to support a full-featured portfolio website with authentication, image handling, Telegram notifications, and more.

---

## 📦 Tech Stack

- **Node.js + Express** — Core API framework  
- **MongoDB + Mongoose** — NoSQL data modeling  
- **JWT Authentication** — Secure user sessions  
- **Cloudinary** — Image hosting  
- **Telegram Bot API** — Real-time alerts  
- **Helmet, xss-clean, rate-limit** — Security middleware  
- **Jest + Supertest** — Testing  
- **Multer + Validator** — Input and file sanitization  
- **Husky + ESLint** — Code quality control  

---

## 🧩 Project Structure

```
├── app.js
├── server.js
├── routes/
├── controllers/
├── models/
├── middlewares/
├── utils/
├── config/
├── tests/
└── docs/
```

---

## ⚙️ Setup & Installation

```bash
git clone https://github.com/dior4003/MernPortifolio01.git
cd MernPortifolio01
npm install
```

Create `config/config.env` using `.env.example` as template:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

FRONTEND_URL=http://localhost:3000
```

Run development server:

```bash
npm run dev
```

---

## 🔐 Authentication Routes

| Endpoint               | Method | Description             |
|------------------------|--------|-------------------------|
| `/api/users/register`  | POST   | Create new user         |
| `/api/users/login`     | POST   | Login user (JWT issued) |
| `/api/users/logout`    | POST   | Invalidate session      |
| `/api/users/me`        | GET    | Get current user        |

---

## 🌐 Main Routes

| Module         | Endpoint Prefix     | Description                     |
|----------------|---------------------|---------------------------------|
| Posts          | `/api/posts`        | Blog post CRUD + like system   |
| Comments       | `/api/comments`     | Post comment management         |
| Projects       | `/api/projects`     | Portfolio projects              |
| Timeline       | `/api/timeline`     | Experience / education blocks   |
| Skills         | `/api/skills`       | Technical skills list           |
| About / Me     | `/api/about`, `/about-me` | Personal profile sections |
| Contact        | `/api/massages`     | Contact form → Telegram alert  |
| Visit Stats    | `/api/visits`       | Analytics log + stats           |
| Notifications  | `/api/notifications`| User alerts                     |
| YouTube        | `/api/youtube`      | Video embed management          |

Full route breakdown available in [`docs/endpoints.md`](./docs/endpoints.md)

---

## ☁️ Cloudinary Integration

- All uploaded images (posts, projects, profile) are stored in Cloudinary  
- Credentials configured via `config.env`  
- Structured folder organization (`/myapp/posts`, `/profiles`, etc.)

---

## 📬 Telegram Alerts

- `node-telegram-bot-api` used to deliver admin notifications  
- Triggered on contact form submission and other events  
- Message formatting supported via Markdown  
- Controlled via `utils/sendTelegramAlert.js`

---

## 🧪 Testing

Run:

```bash
npm run test
```

- Jest & Supertest for route coverage
- Dedicated Mongo test DB via `tests/setup/testDB.js`
- Coverage reports available

---

## 📈 RESTful Endpoint Summary

| Method | Total | Purpose               |
|--------|-------|------------------------|
| GET    | 17    | Fetch data             |
| POST   | 15    | Create resources       |
| PUT    | 10    | Update resources       |
| DELETE | 11    | Remove resources       |
| 📊     | **53**| Total endpoints        |

---

## 🛡 Security Layers

- Input sanitization: `xss-clean`, `mongoSanitize`, `validator`  
- Rate-limiting: `express-rate-limit`  
- Headers: `helmet`  
- Auth checks: `isAuthenticated`, `isAdmin` middleware  
- Custom token validation via `utils/verifyToken.js`

---

## 🐳 Deployment & CI/CD (Optional)

- Environment-based config with `dotenv-expand`  
- Ready for Dockerfile and GitHub Actions integration  
- Supports both development and production modes

---

## 📄 License

MIT License © 2025  
Developed by [Diyor4003](https://github.com/diyor4003)

---

```

# 📘 Portfolio Backend API — Endpoint Documentation

Modular REST API built with Express.js, designed to manage portfolio content, authentication, and real-time alerts via Telegram. Below is a breakdown of all available endpoints.

---

## 🧑‍💻 Authentication

| Endpoint              | Method | Description               | Access     |
|-----------------------|--------|---------------------------|------------|
| `/api/users/register` | POST   | Create a new user         | Public     |
| `/api/users/login`    | POST   | Authenticate & get token  | Public     |
| `/api/users/me`       | GET    | Get current user profile  | Auth Only  |
| `/api/users/logout`   | POST   | Logout from session       | Auth Only  |

---

## 📝 Posts

| Endpoint                   | Method | Description             | Access       |
|----------------------------|--------|-------------------------|--------------|
| `/api/posts`              | GET    | Get all posts           | Public       |
| `/api/posts/:id`          | GET    | Get single post         | Public       |
| `/api/posts`              | POST   | Create post             | Admin Only   |
| `/api/posts/:id`          | PUT    | Update post             | Admin Only   |
| `/api/posts/:id`          | DELETE | Delete post             | Admin Only   |
| `/api/posts/:id/like`     | POST   | Toggle like             | Auth Only    |

---

## 📬 Massages (Contact Form)

| Endpoint            | Method | Description               | Access     |
|---------------------|--------|---------------------------|------------|
| `/api/massages`     | POST   | Send a contact message    | Public     |
| `/api/massages`     | GET    | List all messages         | Admin Only |

---

## 🧠 Skills

| Endpoint            | Method | Description            | Access     |
|---------------------|--------|------------------------|------------|
| `/api/skills`       | GET    | List all skills        | Public     |
| `/api/skills`       | POST   | Add new skill          | Admin Only |
| `/api/skills/:id`   | PUT    | Update a skill         | Admin Only |
| `/api/skills/:id`   | DELETE | Delete a skill         | Admin Only |

---

## 📅 Timeline

| Endpoint               | Method | Description                 | Access     |
|------------------------|--------|-----------------------------|------------|
| `/api/timeline`        | GET    | Get timeline data           | Public     |
| `/api/timeline`        | POST   | Add timeline entry          | Admin Only |
| `/api/timeline/:id`    | PUT    | Update timeline entry       | Admin Only |
| `/api/timeline/:id`    | DELETE | Delete timeline entry       | Admin Only |

---

## 📁 Projects

| Endpoint              | Method | Description             | Access     |
|------------------------|--------|-------------------------|------------|
| `/api/projects`        | GET    | Get all projects        | Public     |
| `/api/projects/:id`    | GET    | Get single project      | Public     |
| `/api/projects`        | POST   | Create project          | Admin Only |
| `/api/projects/:id`    | PUT    | Update project          | Admin Only |
| `/api/projects/:id`    | DELETE | Delete project          | Admin Only |

---

## 📄 About / Me

| Endpoint               | Method | Description               | Access     |
|------------------------|--------|---------------------------|------------|
| `/api/about-me`        | GET    | Get about me content      | Public     |
| `/api/about-me`        | POST   | Create/update about info  | Admin Only |

---

## 🎥 YouTube Videos

| Endpoint               | Method | Description               | Access     |
|------------------------|--------|---------------------------|------------|
| `/api/youtube`         | GET    | List YouTube videos       | Public     |
| `/api/youtube`         | POST   | Add YouTube video         | Admin Only |
| `/api/youtube/:id`     | DELETE | Delete YouTube video      | Admin Only |

---

## 📊 Visit Statistics

| Endpoint               | Method | Description               | Access     |
|------------------------|--------|---------------------------|------------|
| `/api/visits`          | GET    | Get visitor stats         | Admin Only |
| `/api/visits/log`      | POST   | Log visit data            | Public     |

---

## 🔔 Notifications

| Endpoint                  | Method | Description                   | Access     |
|---------------------------|--------|-------------------------------|------------|
| `/api/notifications`      | GET    | List user notifications       | Auth Only  |
| `/api/notifications`      | POST   | Create a notification         | Admin Only |

---

## 📌 Notes

- All `POST/PUT/DELETE` requests require JSON bodies.
- Authenticated requests use: `Authorization: Bearer <token>`
- Admin roles are enforced via middleware: `isAdmin`

---

## 🧑‍💻 Maintained by

**Diyor** – Modular. Secure. Beautiful.  
GitHub: [@dior4003](https://github.com/dior4003)
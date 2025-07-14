### /api/posts

- `GET /api/posts` — Get all posts (public)
- `GET /api/posts/:id` — Get single post by ID
- `POST /api/posts` — Create new post (admin only)
- `PUT /api/posts/:id` — Update post (admin only)
- `DELETE /api/posts/:id` — Delete post (admin only)
- `POST /api/posts/:id/like` — Toggle like (auth required)
```

---

## 🧩 Modul bo‘yicha endpointlar

### 👤 Users

- `POST /api/users/register` — Register new user  
- `POST /api/users/login` — User login  
- `GET /api/users/me` — Get current user profile (auth required)  
- `POST /api/users/logout` — Log out user

---

### 📝 Posts

- `GET /api/posts` — All posts  
- `GET /api/posts/:id` — Single post  
- `POST /api/posts` — Create (admin only)  
- `PUT /api/posts/:id` — Update (admin only)  
- `DELETE /api/posts/:id` — Delete (admin only)  
- `POST /api/posts/:id/like` — Toggle like (auth)

---

### 💬 Massages (Contact Form)

- `POST /api/massages` — Submit contact form (public)  
- `GET /api/massages` — All messages (admin only)

---

### 🧑‍🔬 Skills

- `GET /api/skills` — View skills  
- `POST /api/skills` — Add skill (admin)  
- `PUT /api/skills/:id` — Update skill (admin)  
- `DELETE /api/skills/:id` — Remove skill (admin)

---

### 🧭 Timeline

- `GET /api/timeline` — View timeline  
- `POST /api/timeline` — Add item (admin)  
- `PUT /api/timeline/:id` — Update item  
- `DELETE /api/timeline/:id` — Delete item

---

### 📁 Projects

- `GET /api/projects` — All projects  
- `GET /api/projects/:id` — Single project  
- `POST /api/projects` — Add project (admin)  
- `PUT /api/projects/:id` — Update project  
- `DELETE /api/projects/:id` — Delete project

---

### 📄 About / Me

- `GET /api/about-me` — Get bio/about info  
- `POST /api/about-me` — Create or update (admin)

---

### 📺 YouTube

- `GET /api/youtube` — List videos  
- `POST /api/youtube` — Add video (admin)  
- `DELETE /api/youtube/:id` — Delete video

---

### 📊 Visit Stats

- `GET /api/visits` — Stats overview (admin)  
- `POST /api/visits/log` — Log new visitor

---

### 🔔 Notifications

- `GET /api/notifications` — User notifications  
- `POST /api/notifications` — Add notification (admin)

---
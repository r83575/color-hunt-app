
# 🎨 Color Hunt App
## 🖼️ Preview

![App Preview](https://github.com/user-attachments/assets/b5faccb1-385a-43b7-9261-465a4cd2ef50)


Full-stack web application for managing and creating color palettes.  
Built with Angular (Client) and Node.js + Express (Server).  
The server simulates a MongoDB-like database using local JSON files,  
allowing data persistence without requiring a running MongoDB instance.

---

## 📁 Project Structure

```

color-hunt-app/
├── client/    → Angular frontend
└── server/    → Node.js backend with local MongoDB-style JSON database

````

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/r83575/color-hunt-app.git
cd color-hunt-app
````

---

### 2. Setup the Server

```bash
cd server
npm install
```

Create a new file named `.env` in the `server/` folder,
and copy the content from `.env.example` into it.

Then run the server:

```bash
npm start
```

The server will run by default at:
`http://localhost:8080`

---

### 3. Setup the Client

```bash
cd ../client
npm install
npm start
```

The client will run by default at:
`http://localhost:4200`

To **create a new palette**, navigate to:
👉 `http://localhost:4200/create`

---

## ⚙️ Environment Variables

Defined in `server/.env`:

```env
DATA_BASE_PATH=./data-base
LOGGER_PATH=./data-base
LOGGER_FILE=logger.log
HOST=localhost
PORT=8080
```

Use `.env.example` as a starting point and adjust if needed.

---

## 🧪 Sample Data

Example data and logs are available in:

```
server/data-base-example/
```

To see sample output, you can copy this folder into the path defined in your `.env` file.

---

## 🧪 Running Tests (optional)

In the `server/` folder:

```bash
npm test
```

---

## 📄 License

This project is for educational purposes only.

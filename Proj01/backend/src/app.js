const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
  : [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5000",
      "http://127.0.0.1:5000",
      "http://localhost:8000",
      "http://127.0.0.1:8000",
      "http://localhost:5500",
      "http://127.0.0.1:5500",
    ];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        process.env.NODE_ENV !== "production"
      ) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const frontendPath = path.join(__dirname, "../../frontend");
app.use(express.static(frontendPath));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend server is running smoothly!",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;

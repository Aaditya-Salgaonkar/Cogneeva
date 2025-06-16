const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require("cookie-parser");
const { PORT } = require("./config");

const app = express();

// UPDATED CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://cogneeva-ldlx.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Cogneeva backend is running.");
});

const mvpRoutes = require("./routes/mvp");
app.use("/api/mvp", mvpRoutes);
const aiRoutes = require("./routes/aiRoutes");
app.use('/api/ai', aiRoutes);
const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);
const conversationRoutes = require("./routes/conversationRoutes");
app.use("/api/conversation", conversationRoutes);
const messageRoutes = require("./routes/messageRoutes");
app.use("/api/messages", messageRoutes);
const githubRoutes = require("./routes/githubRoutes");
app.use("/api/github", githubRoutes);
const netlifyRoutes = require("./routes/netlifyRoutes");
app.use("/api/netlify", netlifyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

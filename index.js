const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const faqRoutes = require("./routes/faqRoutes");
const authRoutes = require("./routes/authRoutes");
const layananRoutes = require("./routes/layananRoutes");
const adminRoutes = require("./routes/adminRoutes");

require("dotenv").config();

app.use(cors());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/layanan", layananRoutes);
app.use("/faq", faqRoutes);
app.use("/admin", adminRoutes);

app.get("/", (_req, res) => {
    res.send("Hello Selamat Datang di SJW!");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
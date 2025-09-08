const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./routes/auth");

const app = express();

// استفاده از Helmet برای امنیت
app.use(helmet());

// استفاده از CORS برای مدیریت درخواست‌های بین‌منطقه‌ای
app.use(cors());

app.use(express.json());
app.use("/auth", authRouter);

(async () => {
  await mongoose.connect("mongodb://localhost:27017/sms");
  console.log("mongo db connected");
})();

app.listen(8001, () => {
  console.log(`Server running on port 8001`);
});

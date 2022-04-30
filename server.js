const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const morgan = require("morgan");

// connect to dataBase
connectDB();

// init Midelware
app.use(cors());

app.use(express.json({ extended: false }));
app.use(morgan("dev"));

//Define Routes

app.use("/api/users", require("./routes/auth/users"));
app.use("/api/auth", require("./routes/auth/auth"));
app.use("/api/faculties", require("./routes/facultiesRoute"));
app.use("/api/departments", require("./routes/departmentsRoute"));
app.use("/api/news", require("./routes/NewsRoute"));
app.use("/api/advs", require("./routes/AdvsRoute"));
app.use("/api/files", require("./routes/filesRoute"));
app.use("/api/speech", require("./routes/speechRoute"));
app.use("/api/articles", require("./routes/articlesRoute"));

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});

const express = require("express");
const cors = require('cors');
const router = require("./routes/router");

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors())
app.use(express.json());


app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

app.use("/users", router);
app.use("/amounts", router);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});




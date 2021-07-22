const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

const app = express();

// * BorderParser Middleware 
app.use(express.json());

// * Load Env
dotenv.config({ path: "./config.env" });

//* Log route actions
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//* Use Routes
app.use("/api/course", require("./routes/course"));
app.use("/api/class", require("./routes/class"));
app.use("/api/student", require("./routes/student"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

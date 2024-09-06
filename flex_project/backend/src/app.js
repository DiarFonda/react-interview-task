const express = require("express");
const categoriesRoutes = require("./routes/categoriesRoute");
const jobsitesRoutes = require("./routes/jobsitesRoute");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/Categories", categoriesRoutes);
app.use("/api/Jobsites", jobsitesRoutes);

module.exports = app;

const express = require("express");
const {
  getJobsites,
  addJobsite,
  getJobsiteById,
  updateJobsiteStatus,
  getJobsiteStatusCounts,
} = require("../controllers/jobsitesController");

const router = express.Router();

router.put("/updateJobsite/:id", updateJobsiteStatus);
router.get("/statusCounts", getJobsiteStatusCounts);
router.get("/:id", getJobsiteById);
router.get("/", getJobsites);
router.post("/", addJobsite);

module.exports = router;

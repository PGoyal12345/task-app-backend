var express = require("express");
var router = express.Router();

const {
  getTaskList,
  executeDatabaseQuery,
  insertTask,
  deleteTask,
  updateTask,
} = require("../controller/index");

// API for fetching the task list
router.get("/tasks", getTaskList);
router.post("/tasks", insertTask);
router.delete("/tasks/:id", deleteTask);
router.patch("/tasks/:id", updateTask);

router.post("/dbsync", executeDatabaseQuery);

module.exports = router;

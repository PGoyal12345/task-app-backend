const pool = require("../services/pool");
const { respondWithError, getDate } = require("../utils/index");

const getTaskList = (req, res) => {
  pool.query("select * from task", (err, response) => {
    if (err) {
      respondWithError(err, res, 500);
    } else {
      console.log("response", response);
      res.status(200).json({ data: response });
    }
  });
};

const executeDatabaseQuery = (req, res) => {
  console.log("body", req.body);
  const body = req.body;
  if (body?.query) {
    pool.query(body.query, (err, response) => {
      if (err) {
        respondWithError(err, res, 500);
      } else {
        console.log("response", response);
        res.status(200).json({ data: response });
      }
    });
  } else {
    console.log("error message", "No query provided");
    respondWithError("no query provided", res, 400);
  }
};

const insertTask = (req, res) => {
  const body = req.body;
  if (body.taskHeading && body.task) {
    const date = new Date();
    pool.query(
      "insert into task (taskHeading, task, createdAt, updatedAt) values (?, ?, ?, ?)",
      [body.taskHeading, body.task, getDate(date), getDate(date)],
      (err, response) => {
        if (err) {
          respondWithError(err, res, 500);
        } else {
          console.log("response", response);
          res.status(201).json({ data: "record inserted successfully" });
        }
      }
    );
  } else {
    respondWithError("taskHeading and task are required", res, 400);
  }
};

const deleteTask = (req, res) => {
  const params = req.params;
  console.log("params", params);
  if (params.id) {
    pool.query(
      "delete from task where id = ?",
      [params.id],
      (err, response) => {
        if (err) {
          respondWithError(err, res, 500);
        } else {
          console.log("response", response);
          res.status(200).json({ data: "record deleted successfully" });
        }
      }
    );
  } else {
    respondWithError("taskId is required", res, 400);
  }
};

const updateTask = (req, res) => {
  const body = req.body;
  const params = req.params;
  console.log("params", params);
  if (body.taskHeading && body.task && params.id) {
    pool.query(
      "update task set taskHeading = ?, task = ?, updatedAt = ? where id = ?",
      [body.taskHeading, body.task, getDate(), params.id],
      (err, response) => {
        if (err) {
          respondWithError(err, res, 500);
        } else {
          console.log("response", response);
          res.status(200).json({ data: "record updated successfully" });
        }
      }
    );
  } else {
    respondWithError("taskHeading and task are required", res, 400);
  }
};
module.exports = {
  getTaskList,
  executeDatabaseQuery,
  insertTask,
  deleteTask,
  updateTask,
};

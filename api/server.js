const express = require("express");
const app = express();
app.use(express.json());
const router = express.Router();
const sql = require("mssql");
const config = require("./DBconfig");

router.route("/").get(async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const orders = await pool.request().query("SELECT * from Todos");
    res.status(200).json(orders.recordsets);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const newTodo = await pool
      .request()
      .query(
        `INSERT INTO Todos (ID, Todo) VALUES ('${req.body.ID}', '${req.body.Todo}')`
      );
    res.status(201).json(newTodo.output);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const todo = await pool
      .request()
      .query(`SELECT * from Todos WHERE ID=${req.params.id}`);
    res.status(200).json(todo.recordset);
  } catch (err) {
    res.status(500).json({
      msg: "fail",
    });
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const todo = await pool.request().query(
      `UPDATE Todos SET 
          ${`Title='${req.body.Todo}'`}
           WHERE ID=${req.params.id}`
    );
    res.status(200).json(`${todo.rowsAffected} row updated`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const order = await pool
      .request()
      .query(`DELETE FROM Todos WHERE ID=${req.params.id}`);
    res.status(204).json(`${order.rowsAffected} row deleted`);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.use("/api/todos", router);

app.listen(8080, () => {
  console.log("server started");
});

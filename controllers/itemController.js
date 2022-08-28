const mysql = require("mysql");
const db = require("../configs/Db.configs");

const connection = mysql.createConnection(db.database);

connection.connect((err) => {
  if (!err) {
    console.log("Connected to my sql server");
    const customerTableQuery =
      "CREATE TABLE IF NOT EXISTS item(code VARCHAR(255) NOT NULL," +
      "description VARCHAR(255),qtyOnHand INT," +
      "unitPrice double,CONSTRAINT PRIMARY KEY (code))";
    connection.query(customerTableQuery, (err, result) => {
      if (result.warningCount === 0) {
        console.log("item table created");
      }
      if (err) res.status(500).send(response(err.sqlMessage, null));
    });
  } else {
    console.log(err);
  }
});

const getAllItems = (req, res) => {
  const query = "SELECT * FROM item";
  connection.query(query, (err, rows) => {
    res.send(response("Success!", rows));

    if (err) {
      res.status(500).send(response(err.sqlMessage, null));
    }
  });
};

const searchItem = (req, res) => {
  const code = req.params.code;
  const query = "SELECT * FROM item WHERE code=?";
  connection.query(query, code, (err, rows) => {
    const exist = rows.length;

    if (exist) {
      res.send(response("Success!", rows));
    } else {
      res.send(response("No item for code " + code, null));
    }
    if (err) {
      res.status(500).send(response(err.sqlMessage, null));
    }
  });
};

const saveItem = (req, res) => {
  const code = req.body.code;
  const description = req.body.description;
  const qtyOnHand = req.body.qtyOnHand;
  const unitPrice = req.body.unitPrice;
  const query =
    "INSERT INTO item(code,description,qtyOnHand,unitPrice) VALUES(?,?,?,?)";
  connection.query(query, [code, description, qtyOnHand, unitPrice], (err) => {
    if (!err) {
      res.send(response("Item saved...!", null));
    } else {
      res.status(500).send(response(err.sqlMessage, null));
    }
  });
};

const updateItem = (req, res) => {
  const code = req.body.code;
  const description = req.body.description;
  const qtyOnHand = req.body.qtyOnHand;
  const unitPrice = req.body.unitPrice;
  const query =
    "UPDATE item SET description=?,qtyOnHand=?,unitPrice=? WHERE code=?";
  connection.query(
    query,
    [description, qtyOnHand, unitPrice, code],
    (err, rows) => {
      if (rows.affectedRows > 0) {
        res.send(response("Item updated...!", null));
      } else {
        res.send(response("No item for code " + code, null));
      }

      if (err) {
        res.status(500).send(response(err.sqlMessage, null));
      }
    }
  );
};

const deleteItem = (req, res) => {
  const code = req.params.code;
  const query = "DELETE FROM item WHERE code=? ";
  connection.query(query, code, (err, rows) => {
    if (rows.affectedRows > 0) {
      res.send(response("Item deleted...!", null));
    } else {
      res.send(response("No item for code " + code, null));
    }

    if (err) {
      res.status(500).send(response(err.sqlMessage, null));
    }
  });
};

const response = (message, data) => {
  return { message: message, data: data };
};

module.exports = {
  getAllItems,
  searchItem,
  saveItem,
  updateItem,
  deleteItem,
};

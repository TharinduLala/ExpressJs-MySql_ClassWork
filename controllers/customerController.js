const mysql = require("mysql");
const db = require("../configs/Db.configs");

const connection = mysql.createConnection(db.database);

connection.connect((err) => {
  if (!err) {
    console.log("Connected to my sql server");
    const customerTableQuery =
      "CREATE TABLE IF NOT EXISTS Customer(id VARCHAR(255)," +
      "name VARCHAR(255) NOT NULL DEFAULT 'Unknown',address VARCHAR(255)," +
      "tel VARCHAR(15),CONSTRAINT PRIMARY KEY (id))";
    connection.query(customerTableQuery, (err, result) => {
      if (result.warningCount === 0) {
        console.log("customer table created");
      }
      if (err) res.status(500).send(response(err.sqlMessage, null));
    });
  } else {
    console.log(err);
  }
  
});

const getAllCustomers = (req, res) => {
  const query = "SELECT * FROM customer";
  connection.query(query, (err, rows) => {
    res.send(response("Success!", rows));

    if (err) {
      res.status(500).send(response(err.sqlMessage, null));
    }
  });
};

const searchCustomer = (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM customer WHERE id=?";
  connection.query(query, id, (err, rows) => {
    const exist = rows.length;
    if (exist) {
      res.send(response("Success!", rows));
    } else {
      res.send(response("No user for id " + id, null));
    }

    if (err) {
      res.status(500).send(response(err.sqlMessage, null));
    }
  });
};

const saveCustomer = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const address = req.body.address;
  const tel = req.body.tel;
  const query = "INSERT INTO customer(id,name,address,tel) VALUES(?,?,?,?)";
  connection.query(query, [id, name, address, tel], (err) => {
    if (!err) {
      res.send(response("Customer saved...!", null));
    } else {
      res.status(500).send(response(err.sqlMessage, null));
    }
  });
};

const updateCustomer = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const address = req.body.address;
  const tel = req.body.tel;
  const query = "UPDATE customer SET name=?,address=?,tel=? WHERE id=?";
  connection.query(query, [name, address, tel, id], (err, rows) => {
    if (rows.affectedRows > 0) {
      res.send(response("Customer updated...!", null));
    } else {
      res.send(response("No user for id " + id, null));
    }

    if (err) {
      res.status(500).send(response(err.sqlMessage, null));
    }
  });
};

const deleteCustomer = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM customer WHERE id=? ";
  connection.query(query, id, (err, rows) => {
    if (rows.affectedRows > 0) {
      res.send(response("Customer deleted...!", null));
    } else {
      res.send(response("No user for id " + id, null));
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
  getAllCustomers,
  searchCustomer,
  saveCustomer,
  updateCustomer,
  deleteCustomer,
};

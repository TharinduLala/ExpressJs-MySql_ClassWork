const mysql = require("mysql");
const db = require("../configs/Db.configs");

const connection = mysql.createConnection(db.database);

connection.connect((err) => {
  if (!err) {
    console.log("Connected to my sql server");
    const orderTableQuery =
      "CREATE TABLE IF NOT EXISTS `order`(orderId VARCHAR(255) NOT NULL," +
      "date DATE,customerId VARCHAR(255)," +
      "totalPrice double,orderDetails VARCHAR(255),CONSTRAINT PRIMARY KEY (orderId),CONSTRAINT FOREIGN KEY (customerId) REFERENCES Customer(id))";
    connection.query(orderTableQuery, (err, result) => {
      if (result.warningCount === 0) {
        console.log("order table created");
      }
      if (err) console.log(err);
    });
  } else {
    console.log(err);
  }
});

const getAllOrders = (req, res) => {
  const query = "SELECT * FROM `order`";
  connection.query(query, (err, rows) => {
    let orders = [];
    for (const order of rows) {
      const orderId = order.orderId;
      const date = order.date.toLocaleDateString();
      const customerId = order.customerId;
      const totalPrice = order.totalPrice;
      const orderDetails = JSON.parse(order.orderDetails);
      orders.push({
        orderId: orderId,
        date: date,
        customerId: customerId,
        totalPrice: totalPrice,
        orderDetails: orderDetails,
      });
    }
    if (orders.length > 0) {
      res.send(response("Success!", orders));
    }

    if (err) {
      res.status(500).send(response(err.sqlMessage, null));
    }
  });
};

const searchOrder = (req, res) => {
  const orderId = req.params.orderId;
  const query = "SELECT * FROM `order` WHERE orderId=?";
  connection.query(query, orderId, (err, rows) => {
    const exist = rows.length;
    if (exist) {
      let orders = [];
      for (const order of rows) {
        const orderId = order.orderId;
        const date = order.date.toLocaleDateString();
        const customerId = order.customerId;
        const totalPrice = order.totalPrice;
        const orderDetails = JSON.parse(order.orderDetails);
        orders.push({
          orderId: orderId,
          date: date,
          customerId: customerId,
          totalPrice: totalPrice,
          orderDetails: orderDetails,
        });
      }
      if (orders.length > 0) {
        res.send(response("Success!", orders));
      }
    } else {
      res.send(response("No Order for orderId " + orderId, null));
    }
    if (err) {
      res.status(500).send(response(err.sqlMessage, null));
    }
  });
};

const saveOrder = (req, res) => {
  const orderId = req.body.orderId;
  const date = req.body.date;
  const customerId = req.body.customerId;
  const totalPrice = req.body.totalPrice;
  const orderDetails = JSON.stringify(req.body.orderDetails);
  const query =
    "INSERT INTO `order`(orderId,date,customerId,totalPrice,orderDetails) VALUES(?,?,?,?,?)";
  connection.query(
    query,
    [orderId, date, customerId, totalPrice, orderDetails],
    (err) => {
      if (!err) {
        res.send(response("Order saved...!", null));
      } else {
        res.status(500).send(response(err.sqlMessage, null));
      }
    }
  );
};

const updateOrder = (req, res) => {
  const orderId = req.body.orderId;
  const date = req.body.date;
  const customerId = req.body.customerId;
  const totalPrice = req.body.totalPrice;
  const orderDetails = JSON.stringify(req.body.orderDetails);
  const query =
    "UPDATE `order` SET date=?,customerId=?,totalPrice=?,orderDetails=? WHERE orderId=?";
  connection.query(
    query,
    [date, customerId, totalPrice, orderDetails, orderId],
    (err, rows) => {
      if (rows.affectedRows > 0) {
        res.send(response("Order updated...!", null));
      } else {
        res.send(response("No Order for orderId " + orderId, null));
      }

      if (err) {
        res.status(500).send(response(err.sqlMessage, null));
      }
    }
  );
};

const deleteOrder = (req, res) => {
  const orderId = req.params.orderId;
  const query = "DELETE FROM `order` WHERE orderId=? ";
  connection.query(query, orderId, (err, rows) => {
    if (rows.affectedRows > 0) {
      res.send(response("Order deleted...!", null));
    } else {
      res.send(response("No Order for orderId " + orderId, null));
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
  getAllOrders,
  searchOrder,
  saveOrder,
  updateOrder,
  deleteOrder,
};

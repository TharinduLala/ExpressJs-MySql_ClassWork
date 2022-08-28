const mysql = require("mysql");
const db = require("../configs/Db.configs");

const getAllCustomers = (req, res) => {
  res.send("Customer Get all");
};

const searchCustomer = (req, res) => {
  res.send("Customer search "+req.params.id);
};

const saveCustomer = (req, res) => {
  res.send("Customer save");
};
const updateCustomer = (req, res) => {
  res.send("Customer update");
};
const deleteCustomer = (req, res) => {
  res.send("Customer delete"+req.params.id);
};

module.exports = {
  getAllCustomers,
  searchCustomer,
  saveCustomer,
  updateCustomer,
  deleteCustomer,
};

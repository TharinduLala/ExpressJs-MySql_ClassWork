app.post("/book", (req, res, next) => {
  var mysql = require("mysql");
  var connection = mysql.createConnection(config);
  var sql =
    "INSERT INTO `guest` SET `FirstName`=?,`LastName`=?,`Email`=?,`ContactNumber`=?;SET @GuestID:=LAST_INSERT_ID();INSERT INTO `reservation` SET `GuestID`=@GuestID,`RoomID`=?,`AdultCount`=?,`KidCount`=?,`CheckInDate`=?,`CheckOutDate`=?";
  var FirstName = req.body.FirstName;
  var LastName = req.body.LastName;
  var Email = req.body.Email;
  var ContactNumber = req.body.ContactNumber;
  var RoomID = req.body.RoomID;
  var AdultCount = req.body.AdultCount;
  var KidCount = req.body.KidCount;
  var CheckInDate = req.body.CheckInDate;
  var CheckOutDate = req.body.CheckOutDate;
  connection.query(
    sql,
    [
      FirstName,
      LastName,
      Email,
      ContactNumber,
      RoomID,
      AdultCount,
      KidCount,
      CheckInDate,
      CheckOutDate,
    ],
    (err, results, fields) => {
      connection.end();
      if (err) {
        next(err);
      } else {
        res.json([true, results]);
      }
    }
  );
});



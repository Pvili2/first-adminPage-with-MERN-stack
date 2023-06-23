const app = require("./app.js");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://pvilmos2003:99cPATtFWFGOgx1g@cluster0.rsd6arb.mongodb.net/Prac1?retryWrites=true&w=majority"
  )
  .then((conn) => console.log("Connection successful"));

app.listen(3002, () => {
  console.log("Server is listening ");
});

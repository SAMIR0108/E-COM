let express = require("express");
let session = require("express-session");
let app = express();
let { routes } = require("./routes");
app.use(express.json());
// console.log("hello");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "#*@123",
  })
);
app.set("view engine",'ejs');
app.use(routes);
app.listen(3001, () => {
  console.log("Server is running");
});

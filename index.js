//epress
import express from "express";
//pg promise
import pgPromise from "pg-promise";
//handlebars
import exphbs from "express-handlebars";
//bodyparser
import bodyParser from "body-parser";
//flash
import flash from "connect-flash";
//sessions
import session from "express-session";
//database
import restaurant from "./services/restaurant.js";
//routes
import resturant_routes from "./routes/routes.js";

const app = express();

const DATABASE_URL =
  "postgres://qgtbvckp:rvclmk79eXhageyYs9QHoyz7UBXFeVK8@silly.db.elephantsql.com/qgtbvckp?ssl=true";

const connectionString = process.env.DATABASE_URL || DATABASE_URL;
const db = pgPromise()(connectionString);

//create db istance 
const data = restaurant(db)

const routes = resturant_routes(data)

app.use(
  session({
    secret: "resturant",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static("public"));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const handlebarSetup = exphbs.engine({
  partialsDir: "./views/partials",
  viewPath: "./views",
  layoutsDir: "./views/layouts",
});
app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");
app.use(function (req, res, next) {
  res.locals.messages = req.flash();
  next();
});

//get and post routes
app.get("/",routes.get_tables);

app.post("/book", routes.book_table );

app.get("/bookings", routes.post_book);

app.get("/bookings:username",routes.user_bookings );

app.get("/cancel", routes.cancel_bookings);

var portNumber = process.env.PORT || 3007;

//start everything up
app.listen(portNumber, function () {
  console.log("🚀  server listening on:", portNumber);
});

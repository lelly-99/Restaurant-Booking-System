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
import restaurant from "./services/restaurant";

const app = express()

const DATABASE_URL = 'postgres://qgtbvckp:rvclmk79eXhageyYs9QHoyz7UBXFeVK8@silly.db.elephantsql.com/qgtbvckp?ssl=true';

const connectionString = process.env.DATABASE_URL || DATABASE_URL;
const db = pgPromise()(connectionString);



app.use(
    session({
      secret: "resturant",
      resave: false,
      saveUninitialized: true,
    })
  );
app.use(express.static('public'));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const handlebarSetup = exphbs.engine({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});
app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');
app.use(function (req, res, next) {
    res.locals.messages = req.flash();
    next();
  });

app.get("/", (req, res) => {

    res.render('index', { tables : [{}, {}, {booked : true}, {}, {}, {}]})
});


app.get("/bookings", (req, res) => {
    res.render('bookings', { tables : [{}, {}, {}, {}, {}, {}]})
});


var portNumber = process.env.PORT || 3007;

//start everything up
app.listen(portNumber, function () {
    console.log('🚀  server listening on:', portNumber);
});

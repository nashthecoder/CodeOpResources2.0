const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

const db = require("./app/models");
db.mongoose 
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTologogy: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err = {
        console.log("Cannot connect to the database!", err);
    });
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

//simple route
app.get("/" , (req, res) => {
    res.json({ message: "Welcome to CodeOp Student Resources" });
});

//set port, listen for requests 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on post ${PORT}.`);
});
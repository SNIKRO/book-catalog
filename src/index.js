const express = require("express");
const bodyParser = require("body-parser");
const booksRouter = require("./controllers/books");
const app = express();


app.use(bodyParser.urlencoded({
    extended: true
}))

app.use("/books", booksRouter);

app.listen(3000,undefined,() => {
    console.log("Server is online");
});
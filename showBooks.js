const fs = require("fs");
const express = require("express");
const app = express();
let books = JSON.parse(fs.readFileSync('books.json'));

app.get("/", function(request, response){
   
    response.send(books);

    // let responceBook  = "<ul>";
    // books.forEach(book => {
    //     responceBook += `<li> ID книги: ${book.id} </li>`;
    //     responceBook += `<p> Автор: ${book.authorName}</p>`;
    // });   
    // responceBook +="</ul>";
    // response.send(responceBook);
});

app.listen(3000);
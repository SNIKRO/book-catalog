const fs = require("fs");
const express = require("express");
const app = express();
let books = JSON.parse(fs.readFileSync('books.json'));

app.get("/", function(request, response){
    let bookID = [];
    books.forEach(book => {
        bookID.push(book.id);
    });
    response.send(bookID);

    // let responceBook  = "<ul>";
    // books.forEach(book => {
    //     responceBook += `<li> ID книги: ${book.id} </li>`;
    //     responceBook += `<p> Автор: ${book.authorName}</p>`;
    // });   
    // responceBook +="</ul>";
    // response.send(responceBook);
});

app.listen(3000);
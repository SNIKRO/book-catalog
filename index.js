const fs = require("fs");
const express = require("express");
const app = express();
let books = JSON.parse(fs.readFileSync('books.json'));

app.get("/books", function(request, response){
   
    response.send(books);
});

app.get("/books/:id", function(request, response){
    let message = null;
    books.forEach(book => {
        if(book.id == request.params.id){
         message = book;
        }
    });
    if(message != null){
        response.send(message);
    }
    else{
        response.send("Книга не найдена");
    }
});

app.listen(3000);
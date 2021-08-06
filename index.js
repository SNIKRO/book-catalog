const fs = require("fs");
const express = require("express");
const { json, request } = require("express");
const app = express();
const faker = require("faker");
let books = [];

app.get("/books", function(request, response){
    books = JSON.parse(fs.readFileSync('books.json'));   
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

app.post("/books", function(request, response){
    books.push({
        id: faker.datatype.number(),
        authorName: request.body.name,
        bookName: request.body.book,
        desription: request.body.descript,
        yearOfPublishing: request.body.year        
    });
    fs.writeFile("books.json", JSON.stringify(books, null, 1), function(err, result){
        if(err) console.log("error", err);
    });  
});

app.listen(3000);
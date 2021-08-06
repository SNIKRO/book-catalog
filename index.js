const fs = require("fs");
const express = require("express");
const { json, request } = require("express");
const app = express();
const faker = require("faker");
const e = require("express");

function readMassive(){
    let books =[];
    try {
        books = JSON.parse(fs.readFileSync('books.json'));
        return books;
        
    } catch (error) {
        return undefined;
    } 
    
}

app.get("/books", (request, response) => {
    response.send(readMassive());
});

app.get("/books/:id", (request, response) => {
    const book = readMassive().find((b) => b.id == request.params.id);
    if(!book){
        response.status(404).send("Книга не найдена");
    }
    else{
        response.send(book);
    }
});

app.post("/books", (request, response) =>{
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
const fs = require("fs");
const express = require("express");
const app = express();
const faker = require("faker");
const bodyParser = require("body-parser");


function getDataMiddleware(request, response, next){
    try {
        let books = JSON.parse(fs.readFileSync('books.json'));
        request.books = books;
        next();
        
    } catch (error) {
        console.error(error);
        response.status(500).send("Проблемы на сервере");
        
    } 
    
}
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(getDataMiddleware);

app.get("/books", (request, response) => {
    const {
        page = 0,
        perPage = 10
    } = request.query;
    const total = request.books.length;
    const totalPages = Math.ceil(total / perPage);
    let start = page*perPage;
    const data = request.books.slice(start,perPage+start);
    response.send({
        data,
        pagination: {
            page,
            perPage,
            total,
            totalPages
        }
    });
});

app.get("/books/:id", (request, response) => {
    const book = request.books.find((b) => b.id == request.params.id);
    if(!book){
        response.status(404).send("Книга не найдена");
        return;
    }
    response.send(book);
});

app.post("/books", (request, response) =>{
    const book = {
        id: faker.datatype.number(),
        authorName: request.body.name,
        bookName: request.body.book,
        desription: request.body.desription,
        yearOfPublishing: request.body.year   
             
    };
    request.books.push(book);

    fs.writeFile("books.json", JSON.stringify(request.books, null, 1), function(err, result){
        if(err) {
            console.log("error", err);
            response.status(500).send("Не удалось добавить книгу");
            return;
        };
        response.status(201).send(book);
    });  
});

app.put("/books/:id", (request, response) => {
    const book = request.books.find((b) => b.id == request.params.id);
    if(!book){
        response.status(404).send("Книга не найдена");
        return;
    }
    book.authorName = request.body.authorName ?? book.authorName;
    book.bookName = request.body.book ?? book.bookName;
    book.desription = request.body.desription ?? book.desription;
    book.yearOfPublishing = request.body.year ?? book.yearOfPublishing;
    fs.writeFile("books.json", JSON.stringify(request.books, null, 1), function(err, result){
        if(err) {
            console.log("error", err);
            response.status(500).send("Не удалось обновить книгу");
            return;
        };
        response.status(200).send(book);
    });  
});

app.listen(3000,undefined,() => {
    console.log("Server is online");
});
const faker = require("faker");
const express = require("express");
const fs = require("fs");
const getDataMiddleware = require("./midllewares/getData");
const path = require("path");
const router = express.Router();
const DB_PATH = path.resolve(process.cwd(), "db/books.json");

router.use(getDataMiddleware);

router.get("/", (request, response) => {
    const {
        page = 0,
        perPage = 10
    } = request.query;
    const total = request.books.length;
    const totalPages = Math.ceil(total / perPage);
    let start = page*perPage;
    const data = request.books.slice(start,perPage+start);
    
    if (request.query.search !== undefined){
        const searchBooks = request.books.filter(b => b.bookName.indexOf(request.query.search) > -1);
        if(!searchBooks){
            response.status(404).send("Книга не найдена");
            return;
        }
        response.send(     {
            searchBooks,
            pagination: {
                page,
                perPage,
                total,
                totalPages
            }
        });
    }
    else {
        response.send(     {
            data,
            pagination: {
                page,
                perPage,
                total,
                totalPages
            }
        });
    }
    
});

router.get("/:id", (request, response) => {
    const book = request.books.find((b) => b.id == request.params.id);
    if(!book){
        response.status(404).send("Книга не найдена");
        return;
    }
    response.send(book);
});


router.post("/", (request, response) =>{
    const book = {
        id: faker.datatype.number(),
        authorName: request.body.name,
        bookName: request.body.book,
        description: request.body.description,
        yearOfPublishing: request.body.year   
             
    };
    request.books.push(book);

    fs.writeFile(DB_PATH, JSON.stringify(request.books, null, 1), function(err, result){
        if(err) {
            console.log("error", err);
            response.status(500).send("Не удалось добавить книгу");
            return;
        };
        response.status(201).send(book);
    });  
});

router.put("/:id", (request, response) => {
    const book = request.books.find((b) => b.id == request.params.id);
    if(!book){
        response.status(404).send("Книга не найдена");
        return;
    }
    book.authorName = request.body.authorName ?? book.authorName;
    book.bookName = request.body.book ?? book.bookName;
    book.description = request.body.description ?? book.description;
    book.yearOfPublishing = request.body.year ?? book.yearOfPublishing;
    fs.writeFile(DB_PATH, JSON.stringify(request.books, null, 1), function(err, result){
        if(err) {
            console.log("error", err);
            response.status(500).send("Не удалось обновить книгу");
            return;
        };
        response.status(200).send(book);
    });  
});

router.delete("/:id", (request, response) => {
    const bookIndex = request.books.findIndex((b) => b.id.toString() === request.params.id);
    if(bookIndex === -1){
        response.status(404).send("Книга не найдена");
        return;
    }
    request.books.splice(bookIndex,1);

    fs.writeFile(DB_PATH, JSON.stringify(request.books, null, 1), function(err, result){
        if(err) {
            console.log("error", err);
            response.status(500).send("Не удалось удалить книгу");
            return;
        };
        response.sendStatus(200);
    }); 

});

module.exports = router;
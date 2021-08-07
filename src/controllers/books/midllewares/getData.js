const fs = require("fs");
const path = require("path");
function getDataMiddleware(request, response, next){
    try {
        let books = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "db/books.json")));
        request.books = books;
        next();
        
    } catch (error) {
        console.error(error);
        response.status(500).send("Проблемы на сервере");
        
    } 
    
}

module.exports = getDataMiddleware;
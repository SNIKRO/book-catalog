let faker = require("faker");
let fs = require("fs");
faker.locale = "ru";
function createBooks(numbers){
       
    let books = [];
    
    for(let i = 0; i < numbers; i++){
        books.push({
            id: faker.datatype.number(),
            authorName: faker.name.findName(),
            bookName: faker.lorem.word(),
            descriptions: faker.lorem.paragraph(),
            yearOfPublishing: faker.date.past()
            
        });
        
    }
    fs.stat('./db', function(error){
        if(error.code === "ENOENT"){
            fs.mkdirSync('./db');    
        }  
        fs.writeFile("./db/books.json", JSON.stringify(books, null, 1), function(err, result){
            if(err) console.log("error", err);
        });
        
    }); 
}
createBooks(process.argv[2]);
let faker = require("faker");
let fileSave = require("fs");
faker.locale = "ru";
function createBooks(numbers){
    let books = [];

    for(let i = 0; i < numbers; i++){
        books.push({
            authorName: faker.name.findName(),
            bookName: faker.lorem.word(),
            desription: faker.lorem.paragraph(),
            yearOfPublishing: faker.date.past()
            
        });
    }
   return fileSave.writeFile("books.json", JSON.stringify(books, null, 1), function(err, result){
       if(err) console.log("error", err);
   }); 
}

createBooks(5);

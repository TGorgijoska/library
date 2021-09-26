function Book(title, author, numPages, read){
    this.title = title
    this.author = author
    this.numPages = numPages
    this.read = read
    this.info = function(){
        return `${title} by ${author}, ${numPages} pages, ${read}`;
    }
}

const myBook = new Book("HP", "JK.R", "345", "yes");
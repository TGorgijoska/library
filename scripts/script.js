const form = document.getElementById("form");
const submitBtn = document.getElementById('submit-btn');
const openModal = document.getElementById('addBook');
const closeModal = document.getElementById('close');
const modal = document.querySelector('.modal');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const removeBtn = document.querySelectorAll('.removeBtn');
let library = [];
let newbook;

class Book {
    constructor(title, author, numPages, read) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.read = read;
        
    }
    info(){
        return `${title} by ${author}, ${numPages} pages, ${read}`;
    }
}

const myBook = new Book("HP", "JK.R", "345", "yes");
addBookToLibrary(myBook);

submitBtn.addEventListener('click', createBook);
openModal.addEventListener('click', () => {
    formReset()
    openModalForm()
});
closeModal.addEventListener('click',closeModalForm);
form.addEventListener('submit', handleForm);
removeBtn.forEach(btn => btn.addEventListener('click', () => deleteBook(btn.dataset.cardnum)));

function addBookToLibrary(book) {
    library.push(book);
}

function createBook() {
    // event.preventDefault();
    if(checkInput()){
        newbook = new Book(title.value, author.value, pages.value, read.value);
        addBookToLibrary(newbook);
        // formReset();
        closeModalForm();
    }       
}
// todo: printBooks(); changeReadStatus()

function printBooks(params) {
    
}
function deleteBook(card) {
    let div = document.querySelector(`[data-cardnum="${card}"]`);
    div.parentNode.removeChild(div);
}
function openModalForm() {
    modal.classList.remove('disable');   
}
function closeModalForm() {
    modal.classList.add('disable');
}

function checkInput(){
    if(title.value == '' || author.value == '' || pages.value == ''){
        return false;
    }
    return true;
}
function formReset(){
    title.value = "";
    author.value = "";
    pages.value = "";
    read.value = "no";
}
function handleForm(event) { 
    event.preventDefault(); 
} 
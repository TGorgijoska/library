const submitBtn = document.getElementById('submit-btn');
const openModal = document.getElementById('addBook');
const closeModal = document.getElementById('close');
const modal = document.querySelector('.modal');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
let library = [];
let newbook;

function Book(title, author, numPages, read){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.info = function(){
        return `${title} by ${author}, ${numPages} pages, ${read}`;
    }
}

function addBookToLibrary(book) {
    library.push(book);
}

const myBook = new Book("HP", "JK.R", "345", "yes");
addBookToLibrary(myBook);

submitBtn.addEventListener('click', createBook);
openModal.addEventListener('click', openModalForm);
closeModal.addEventListener('click',closeModalForm);

function openModalForm() {
    modal.classList.remove('disable');
    
}
function closeModalForm() {
    modal.classList.add('disable');
}

function createBook() {
    event.preventDefault();
    newbook = new Book(title.value, author.value, pages.value, read.value);
    addBookToLibrary(newbook);
    formReset();
    closeModalForm();
}
function formReset(){
    title.value = "";
    author.value = "";
    pages.value = "";
    read.value = "no";
}
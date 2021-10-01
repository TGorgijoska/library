const form = document.getElementById("form");
const submitBtn = document.getElementById('submit-btn');
const openModal = document.getElementById('addBook');
const closeModal = document.getElementById('close');
const modal = document.querySelector('.modal');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const cards = document.querySelector('.book-cards');
const removeBtn = document.querySelectorAll('.removeBtn');
const readBtn = document.querySelectorAll('.readBtn');
let library = [];
let newbook, lenght;
// ---- for creating a book-card
let div = document.createElement('div');
div.className = "card";
let h2 = document.createElement('h2');
h2.className = "title";
let pa = document.createElement('p');
pa.className = "author";
pa.textContent = "by ";
let pp = document.createElement('p');
pp.className = "pages";
pp.innerHTML = "pages: ";
let btn1 = document.createElement('button');
btn1.classList.add("btn");
btn1.classList.add("readBtn");
let btn2 = document.createElement('button');
btn2.classList.add("btn");
btn2.classList.add("removeBtn");
btn2.textContent = "X";

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

let myBook = new Book("cb", "JK.R", "345", "read");
addBookToLibrary(myBook);
myBook = new Book("Abfe", "JK.R", "345", "read");
addBookToLibrary(myBook);

submitBtn.addEventListener('click', createBook);
openModal.addEventListener('click', () => {
    formReset()
    openModalForm()
});
closeModal.addEventListener('click',closeModalForm);
form.addEventListener('submit', handleForm);
removeBtn.forEach(btn => btn.addEventListener('click', () => deleteBook(btn.dataset.cardnum)));
readBtn.forEach(btn => btn.addEventListener('click', () => changeReadStatus(btn)));

function addBookToLibrary(book) {
    return library.push(book);
}

function createBook() {
    // event.preventDefault();
    if(checkInput()){
        newbook = new Book(title.value, author.value, pages.value, read.value);
        lenght = addBookToLibrary(newbook);
        // formReset();
        printBook(lenght);
        closeModalForm();
    }       
}
// todo: 

function printBook(cardnum) {
    div.dataset.cardnum = cardnum;
    h2.textContent = title.value;
    pa.textContent = "by " + author.value;
    pp.textContent = pages.value + " pages";
    btn1.dataset.cardnum = cardnum;
    btn1.textContent = read.value;
    btn2.dataset.cardnum = cardnum;

    div.appendChild(h2);
    div.appendChild(pa);
    div.appendChild(pp);
    div.appendChild(btn1);
    div.appendChild(btn2);
    cards.appendChild(div);
}
function changeReadStatus(btn) {
    if(btn.textContent == "read"){
        btn.textContent = "not read";
        library[btn.dataset.cardnum].read = "not read";
    } else {
        btn.textContent = "read";
        library[btn.dataset.cardnum].read = "read";
    }
}
function deleteBook(card) {
    let div = document.querySelector(`[data-cardnum="${card}"]`);
    div.parentNode.removeChild(div);
    delete library[card];
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
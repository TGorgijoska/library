
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
    if(checkInput()){
        newbook = new Book(title.value, author.value, pages.value, read.value);
        lenght = addBookToLibrary(newbook);
        printBook(lenght-1);
        setStorage();
        closeModalForm();
    }       
}

function printBook(cardnum) {
    // div card
    let div = document.createElement('div');
    div.className = "card";
    div.dataset.cardnum = cardnum;
    // heading title
    let h2 = document.createElement('h2');
    h2.className = "title";
    h2.textContent = library[cardnum].title;
    // paragraph author
    let pa = document.createElement('p');
    pa.className = "author";
    pa.textContent = "by " + library[cardnum].author;
    // paragraph pages
    let pp = document.createElement('p');
    pp.className = "pages";
    pp.textContent = library[cardnum].numPages + " pages";
    // button toggle read/unread
    let btn1 = document.createElement('button');
    btn1.classList.add("btn");
    btn1.classList.add("readBtn");
    btn1.dataset.cardnum = cardnum;
    btn1.textContent = library[cardnum].read;
    btn1.addEventListener('click',()=> changeReadStatus(btn1));
    // button delete card
    let btn2 = document.createElement('button');
    btn2.classList.add("btn");
    btn2.classList.add("removeBtn");
    btn2.textContent = "X";
    btn2.dataset.cardnum = cardnum;
    btn2.addEventListener('click', ()=> deleteBook(btn2.dataset.cardnum))
    
    
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
    setStorage();
}
function deleteBook(card) {
    let div = document.querySelector(`[data-cardnum="${card}"]`);
    div.parentNode.removeChild(div);
    delete library[card];
    setStorage();
}
function openModalForm() {
    modal.classList.remove('disable');   
}
function closeModalForm() {
    modal.classList.add('disable');
}

function checkInput(){
    if(!title.validity.valid){
        document.getElementById('title-valid').textContent = title.validationMessage;       
    }
    else return true;
    if(!author.validity.valid){
        document.getElementById('author-valid').textContent = author.validationMessage;   
    }
    else return true;
    if(!pages.validity.valid) {
        document.getElementById('pages-valid').textContent = pages.validationMessage;
    } 
    else return true;
}
function formReset(){
    title.value = "";
    author.value = "";
    pages.value = "";
    read.value = "not read";
    // remove validation message 
    document.querySelectorAll('.valid').forEach(el => el.textContent = '');
}
function handleForm(event) { 
    event.preventDefault(); 
}

function setStorage(){
    if (storageAvailable('localStorage')) {
        localStorage.setItem('library', JSON.stringify(library));
    }
}
function getLocalStorage(){
    if(localStorage.getItem('library') != "[null]"){
        const books =  JSON.parse(localStorage.getItem('library'));
        library = books.map(book => JSONtoBook(book));
        for(let i = 0; i<library.length; i++){
            if(library[i] != null){
                printBook(i);
            }
        }
    }
}
function JSONtoBook(book) {
    return new Book(book.title, book.author, book.numPages, book.read);
    
}

// for localStorage
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

getLocalStorage();
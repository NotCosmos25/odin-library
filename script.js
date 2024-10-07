//global var (id naive approach, but works for small proejcts like this)
let bookId = 0;

//global DOM
const libraryContainer = document.querySelector(".library-container");
const showaddBookBtn = document.querySelector(".show-add-book-modal-btn");
const addBookModal = document.querySelector("#add-book-modal");
const closeBookModalBtn = document.querySelector(".close-book-modal-btn");
const addBookBtn = document.querySelector(".add-book-btn");
const bookTitleInput = document.querySelector("#book-title-input");
const bookAuthorInput = document.querySelector('#book-author-input');
const bookReadStatusSelect = document.querySelector('#book-read-status-select');
const bookPageNumberInput =  document.querySelector("#book-page-number-input");
const form = document.querySelector("form");

//global events
showaddBookBtn.addEventListener("click", (e) => {
    addBookModal.showModal();
})

addBookBtn.addEventListener("click", (e) => {
    
    if(bookAuthorInput.value === "" || bookTitleInput.value === "" || bookPageNumberInput.value === "") {
        alert("Make sure all inputs are filled");
    }
    
    else {
    const newBook = new Book(+bookId, bookTitleInput.value, bookAuthorInput.value, bookReadStatusSelect.value, bookPageNumberInput.value);
    myLibrary.push(newBook);

    const newCardDiv = document.createElement("div");
    newCardDiv.setAttribute("id", bookId);
    newCardDiv.classList.add("book-card");
    const newBookTitleDiv = document.createElement("div");
    newBookTitleDiv.classList.add("book-title-container");
    newBookTitleDiv.setAttribute("id", bookId);
    const newBookTitle = document.createElement("p");
    newBookTitle.classList.add("book-title");
    newBookTitle.setAttribute("id", bookId);
    newBookTitle.textContent = bookTitleInput.value;

    newBookTitleDiv.append(newBookTitle);

    const newBookInfoDiv = document.createElement("div");
    newBookInfoDiv.classList.add("book-info-container");
    newBookInfoDiv.setAttribute("id", bookId);
    const newBookAuthor = document.createElement("p");
    newBookAuthor.classList.add("book-author");
    newBookAuthor.textContent = bookAuthorInput.value;
    newBookAuthor.setAttribute("id", bookId);
    const newBookReadStatus = bookReadStatusSelect.cloneNode(true);
    newBookReadStatus.setAttribute("id", bookId);
    newBookReadStatus.addEventListener("change", (e) => {
        for(let i=0; i < myLibrary.length; i++) {
            if(myLibrary[i].bookId === +e.target.getAttribute("id")) {
                myLibrary[i].readStatus = e.target.value;
                console.log(myLibrary);
            }
        }
    })



    const newBookPages = document.createElement("p");
    newBookPages.classList.add("book-pages");
    newBookPages.textContent = bookPageNumberInput.value;
    newBookPages.setAttribute("id", bookId);
    const newDeleteButtonContainer = document.createElement("div");
    newDeleteButtonContainer.classList.add("delete-btn-container");
    newDeleteButtonContainer.setAttribute("id", bookId);
    const newDeleteButton = document.createElement("button");
    newDeleteButton.textContent = "delete";
    newDeleteButton.classList.add("delete-card-btn");
    newDeleteButton.setAttribute("id", bookId);
    newDeleteButtonContainer.append(newDeleteButton);
    newBookInfoDiv.append(newBookAuthor, newBookReadStatus, newBookPages, newDeleteButtonContainer);
    
    newCardDiv.append(newBookTitleDiv, newBookInfoDiv);
    libraryContainer.append(newCardDiv); 
    
    newDeleteButton.addEventListener("click", (e) => {
        
        for(let i=0; i < myLibrary.length; i++) {
            if(myLibrary[i].bookId === +e.target.getAttribute("id")) {
                myLibrary.splice(i, 1);
            }
        }
        console.log(myLibrary);

        document.querySelectorAll(`[id="${e.target.getAttribute("id")}"]`).forEach(element => {
            element.remove();
        })

    });
    
    newCardDiv.append(newBookTitleDiv, newBookInfoDiv);
    libraryContainer.append(newCardDiv);

    bookId++;
    console.log(myLibrary); 

    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    bookPageNumberInput.value = "";

    e.preventDefault();
    addBookModal.close();
    }
    
})

closeBookModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addBookModal.close();
})


//global const
const myLibrary = [];

function Book(bookId, title, author, readStatus, pages) {
    this.bookId = bookId;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

